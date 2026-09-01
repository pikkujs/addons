import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import { loadCart, openCart } from '../../lib/cart.js'
import { GetCartOutput } from './get.function.js'

export const SetCartItemInput = z.object({
  token: z.string().optional().describe('The cart token. Omit to open a new cart'),
  variantId: z.string().describe('The variant to set the quantity of'),
  quantity: z
    .number()
    .int()
    .nonnegative()
    .describe('Absolute quantity, not a delta. Zero removes the line'),
})

export const SetCartItemOutput = GetCartOutput

/**
 * Sets a line to an absolute quantity rather than adding a delta, so a retried
 * request cannot double an item — the cart endpoints are called from a browser,
 * where a double-submit is routine.
 */
export const setCartItem = pikkuSessionlessFunc({
  description: 'Set the quantity of one variant in a cart, removing the line when the quantity is zero',
  node: { displayName: 'Set Cart Item', category: 'Cart', type: 'action' },
  input: SetCartItemInput,
  output: SetCartItemOutput,
  tags: ['addon'],
  func: async ({ kysely, paymentOwner }, data, { session }) => {
    const owner = await paymentOwner.resolve(session)
    const cartId = await openCart(kysely, data.token, owner)
    const now = new Date().toISOString()

    if (data.quantity === 0) {
      await kysely
        .deleteFrom('paymentCartItem')
        .where('cartId', '=', cartId)
        .where('variantId', '=', data.variantId)
        .execute()
    } else {
      const variant = await kysely
        .selectFrom('paymentVariant')
        .select(['id', 'active', 'stock', 'currency'])
        .where('id', '=', data.variantId)
        .executeTakeFirst()
      if (!variant || variant.active !== 1) {
        throw new BadRequestError(`Variant ${data.variantId} is not available`)
      }
      if (variant.stock !== null && variant.stock < data.quantity) {
        throw new BadRequestError(
          `Only ${variant.stock} of variant ${data.variantId} left`
        )
      }

      const cart = await loadCart(kysely, cartId)
      const otherCurrency = cart.lines.find(
        (line) => line.variantId !== data.variantId && line.currency !== variant.currency
      )
      if (otherCurrency) {
        throw new BadRequestError(
          `Cart is in ${otherCurrency.currency} and this variant is priced in ${variant.currency}`
        )
      }

      await kysely
        .insertInto('paymentCartItem')
        .values({
          id: crypto.randomUUID(),
          cartId,
          variantId: data.variantId,
          quantity: data.quantity,
          createdAt: now,
          updatedAt: now,
        })
        .onConflict((oc) =>
          oc.columns(['cartId', 'variantId']).doUpdateSet({ quantity: data.quantity, updatedAt: now })
        )
        .execute()
    }

    await kysely.updateTable('paymentCart').set({ updatedAt: now }).where('id', '=', cartId).execute()

    const cart = await loadCart(kysely, cartId)
    return {
      token: cart.token,
      lines: cart.lines,
      subtotalMinor: cart.subtotalMinor,
      currency: cart.currency,
      requiresShipping: cart.requiresShipping,
    }
  },
})

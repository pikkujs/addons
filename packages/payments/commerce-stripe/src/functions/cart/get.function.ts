import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { loadCart, openCart } from '../../lib/cart.js'

export const GetCartInput = z.object({
  token: z
    .string()
    .optional()
    .describe('The cart token held by the browser. Omit to open a new cart and receive one'),
})

export const CartLineOutput = z.object({
  variantId: z.string(),
  productId: z.string(),
  productName: z.string(),
  variantName: z.string(),
  sku: z.string().nullable(),
  quantity: z.number(),
  unitAmountMinor: z.number(),
  lineAmountMinor: z.number(),
  currency: z.string(),
  requiresShipping: z.boolean(),
  stock: z.number().nullable(),
  available: z.boolean().describe('False when stock is tracked and the line asks for more than remains'),
})

export const GetCartOutput = z.object({
  token: z.string().describe('Store this in the browser; it identifies the cart on later calls'),
  lines: z.array(CartLineOutput),
  subtotalMinor: z.number().describe("Sum of the lines, in the currency's minor unit. Excludes shipping and tax"),
  currency: z.string().nullable().describe('Null while the cart is empty'),
  requiresShipping: z.boolean().describe('True when any line is a physical product'),
})

export const getCart = pikkuSessionlessFunc({
  description: 'Fetch a cart by token, opening a new one if the token is missing or already checked out',
  node: { displayName: 'Get Cart', category: 'Cart', type: 'action' },
  input: GetCartInput,
  output: GetCartOutput,
  tags: ['addon'],
  func: async ({ kysely, paymentOwner }, data, { session }) => {
    const owner = await paymentOwner.resolve(session)
    const cartId = await openCart(kysely, data.token, owner)
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

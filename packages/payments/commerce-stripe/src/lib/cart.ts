import type { Kysely } from 'kysely'
import { BadRequestError } from '@pikku/core/errors'
import type { PaymentDatabase } from '../../types/application-types.js'
import type { PaymentOwnerRef } from '../payment-owner.service.js'

export type CartLine = {
  variantId: string
  productId: string
  productName: string
  variantName: string
  sku: string | null
  quantity: number
  unitAmountMinor: number
  lineAmountMinor: number
  currency: string
  requiresShipping: boolean
  stock: number | null
  /** False when stock is tracked and the cart asks for more than remains. */
  available: boolean
}

export type LoadedCart = {
  id: string
  token: string
  status: 'open' | 'converted' | 'abandoned'
  email: string | null
  lines: CartLine[]
  currency: string | null
  subtotalMinor: number
  requiresShipping: boolean
}

/**
 * Reads a cart and prices it from the catalogue as it stands right now.
 *
 * Cart items deliberately store no price snapshot. A price the customer saw an
 * hour ago is not a price you are obliged to honour, and carrying a snapshot
 * means either honouring a stale one or explaining a change at checkout. The
 * order, by contrast, does snapshot — that one is a record of what was agreed.
 */
export const loadCart = async (
  kysely: Kysely<PaymentDatabase>,
  cartId: string
): Promise<LoadedCart> => {
  const cart = await kysely
    .selectFrom('paymentCart')
    .selectAll()
    .where('id', '=', cartId)
    .executeTakeFirst()
  if (!cart) {
    throw new BadRequestError(`Unknown cart ${cartId}`)
  }

  const rows = await kysely
    .selectFrom('paymentCartItem')
    .innerJoin('paymentVariant', 'paymentVariant.id', 'paymentCartItem.variantId')
    .innerJoin('paymentProduct', 'paymentProduct.id', 'paymentVariant.productId')
    .select([
      'paymentCartItem.quantity as quantity',
      'paymentVariant.id as variantId',
      'paymentVariant.name as variantName',
      'paymentVariant.sku as sku',
      'paymentVariant.amountMinor as amountMinor',
      'paymentVariant.currency as currency',
      'paymentVariant.stock as stock',
      'paymentProduct.id as productId',
      'paymentProduct.name as productName',
      'paymentProduct.requiresShipping as requiresShipping',
    ])
    .where('paymentCartItem.cartId', '=', cartId)
    .orderBy('paymentProduct.name', 'asc')
    .execute()

  const lines: CartLine[] = rows.map((row) => ({
    variantId: row.variantId,
    productId: row.productId,
    productName: row.productName,
    variantName: row.variantName,
    sku: row.sku,
    quantity: row.quantity,
    unitAmountMinor: row.amountMinor,
    lineAmountMinor: row.amountMinor * row.quantity,
    currency: row.currency,
    requiresShipping: row.requiresShipping === 1,
    stock: row.stock,
    available: row.stock === null || row.stock >= row.quantity,
  }))

  return {
    id: cart.id,
    token: cart.token,
    status: cart.status,
    email: cart.email,
    lines,
    currency: lines[0]?.currency ?? null,
    subtotalMinor: lines.reduce((total, line) => total + line.lineAmountMinor, 0),
    requiresShipping: lines.some((line) => line.requiresShipping),
  }
}

/**
 * Finds an open cart by token, or opens a new one. The token is the customer's
 * handle on an anonymous cart — it goes in a cookie or local storage — so it is
 * a random id rather than anything guessable from the cart's contents.
 */
export const openCart = async (
  kysely: Kysely<PaymentDatabase>,
  token: string | undefined,
  owner: PaymentOwnerRef | null
): Promise<string> => {
  let claimed = false
  if (token) {
    const existing = await kysely
      .selectFrom('paymentCart')
      .select(['id', 'status'])
      .where('token', '=', token)
      .executeTakeFirst()
    if (existing?.status === 'open') {
      return existing.id
    }
    // The token is taken by a cart that has already checked out, so it cannot
    // be reused — the unique index would reject it, and the customer wants a
    // fresh cart anyway.
    claimed = existing !== undefined
  }

  const now = new Date().toISOString()
  const id = crypto.randomUUID()
  await kysely
    .insertInto('paymentCart')
    .values({
      id,
      token: token && !claimed ? token : crypto.randomUUID(),
      ownerType: owner?.type ?? null,
      ownerId: owner?.id ?? null,
      email: null,
      status: 'open',
      createdAt: now,
      updatedAt: now,
    })
    .execute()
  return id
}

import type { Kysely } from 'kysely'
import type { PaymentDatabase } from '../../types/application-types.js'

type Logger = { warn: (message: string) => void }

type StripeAddress = {
  name?: unknown
  address?: {
    line1?: unknown
    line2?: unknown
    city?: unknown
    state?: unknown
    postal_code?: unknown
    country?: unknown
  }
}

const asString = (value: unknown): string | null => (typeof value === 'string' ? value : null)

const shippingColumns = (shipping: StripeAddress) => {
  const columns: Record<string, string> = {}
  const set = (column: string, value: unknown) => {
    const text = asString(value)
    if (text !== null) {
      columns[column] = text
    }
  }
  set('shippingName', shipping.name)
  set('shippingLine1', shipping.address?.line1)
  set('shippingLine2', shipping.address?.line2)
  set('shippingCity', shipping.address?.city)
  set('shippingState', shipping.address?.state)
  set('shippingPostalCode', shipping.address?.postal_code)
  set('shippingCountry', shipping.address?.country)
  return columns
}

const asNumber = (value: unknown): number | null => (typeof value === 'number' ? value : null)

/**
 * Where Stripe puts the shipping address moved: older API versions expose it as
 * `shipping_details` on the session, newer ones nest it under
 * `collected_information`. The addon does not pin an API version by default, so
 * it reads whichever the account happens to send.
 */
const shippingDetailsOf = (object: Record<string, unknown>): StripeAddress | null => {
  const collected = object.collected_information as { shipping_details?: StripeAddress } | undefined
  return (collected?.shipping_details ?? (object.shipping_details as StripeAddress | undefined)) ?? null
}

/**
 * Moves stock and closes the cart on the transition into 'paid'.
 *
 * Guarded on the previous status so it can be called from anywhere the money
 * actually arrives — a settled webhook, or a manual capture — without a Stripe
 * retry or a capture-after-async decrementing a second time.
 */
export const applyPaidTransition = async (
  kysely: Kysely<PaymentDatabase>,
  order: { id: string; cartId: string | null; status: string },
  now: string
): Promise<void> => {
  if (order.status !== 'paid') {
    const items = await kysely
      .selectFrom('paymentOrderItem')
      .select(['variantId', 'quantity'])
      .where('orderId', '=', order.id)
      .execute()
    for (const item of items) {
      if (item.variantId) {
        await kysely
          .updateTable('paymentVariant')
          .set((eb) => ({ stock: eb('stock', '-', item.quantity), updatedAt: now }))
          .where('id', '=', item.variantId)
          .where('stock', 'is not', null)
          .execute()
      }
    }
  }

  if (order.cartId) {
    await kysely
      .updateTable('paymentCart')
      .set({ status: 'converted', updatedAt: now })
      .where('id', '=', order.cartId)
      .execute()
  }
}

/**
 * Applies a completed Checkout Session to its order.
 *
 * Called for both `checkout.session.completed` and
 * `checkout.session.async_payment_succeeded`, because a delayed-notification
 * method (ACH, SEPA, bank transfer) completes checkout with the money still in
 * flight. Stripe's fulfilment guide is explicit that `payment_status` decides
 * whether to fulfil, so an unpaid session lands the order in 'processing': the
 * address and payment intent are recorded, but no stock moves and the order
 * never enters the shipping queue until the funds arrive.
 *
 * Safe to run twice. Stock only moves on the transition into 'paid', so a
 * session that is settled again — a Stripe retry, or completed followed by
 * async_payment_succeeded — does not decrement a second time.
 */
export const settleCheckoutSession = async (
  kysely: Kysely<PaymentDatabase>,
  logger: Logger,
  session: Record<string, unknown>,
  now: string
): Promise<void> => {
  const sessionId = asString(session.id)
  const order = await kysely
    .selectFrom('paymentOrder')
    .select(['id', 'cartId', 'status', 'captureMethod'])
    .where('stripeCheckoutSessionId', '=', sessionId)
    .executeTakeFirst()
  if (!order) {
    logger.warn(`stripe webhook: no order for checkout session ${sessionId}`)
    return
  }

  // Two very different things arrive as 'unpaid': a manual-capture session the
  // customer completed (money held, ours to take) and a delayed method still in
  // flight (money not ours yet). Neither may be fulfilled, but only the first
  // can be captured, so they need separate states.
  const paid = asString(session.payment_status) !== 'unpaid'
  const unpaidState = order.captureMethod === 'manual' ? 'authorized' : 'processing'
  const shipping = shippingDetailsOf(session)
  const customer = session.customer_details as { email?: unknown } | undefined
  const amountTotal = asNumber(session.amount_total)
  const customerEmail = asString(customer?.email)

  await kysely
    .updateTable('paymentOrder')
    .set({
      status: paid ? 'paid' : unpaidState,
      stripePaymentIntentId: asString(session.payment_intent),
      ...(amountTotal !== null ? { amountMinor: amountTotal } : {}),
      ...(customerEmail !== null ? { email: customerEmail } : {}),
      // Only what this payload actually carries. `completed` and
      // `async_payment_succeeded` arrive for the same session and the second
      // need not repeat the address, so writing nulls unconditionally would
      // erase the address the first one recorded.
      ...(shipping ? shippingColumns(shipping) : {}),
      updatedAt: now,
    })
    .where('id', '=', order.id)
    .execute()

  if (!paid) {
    return
  }

  await applyPaidTransition(kysely, order, now)
}

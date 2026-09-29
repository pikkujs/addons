import type { Kysely } from 'kysely'
import type { Logger } from '@pikku/core/services'
import type { PaymentDatabase } from '../../types/application-types.js'
import { settleCheckoutSession } from './settle-order.js'
import { isForeignEnvironment } from './environment-id.js'

/**
 * What this receiver acts on. Everything else — `customer.subscription.*` above
 * all, which Stripe delivers to every endpoint on the account and which belongs
 * to whatever owns plans and licensing — is acknowledged and ignored: an
 * endpoint that answers anything but a 2xx gets retried and eventually disabled
 * by Stripe, which would take the order events down with it.
 *
 * Narrow the endpoint's own event selection in Stripe to this list and none of
 * the rest is delivered here in the first place.
 */
const HANDLED = new Set([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed',
  'checkout.session.expired',
  'payment_intent.payment_failed',
  'charge.refunded',
  'charge.dispute.created',
  'charge.dispute.closed',
])

export type StripeEvent = {
  id: string
  type: string
  data: { object: Record<string, unknown> & { metadata?: Record<string, unknown> | null } }
}

const asString = (value: unknown): string | null => (typeof value === 'string' ? value : null)

const asNumber = (value: unknown): number | null => (typeof value === 'number' ? value : null)

/**
 * Apply a verified Stripe event to the payment tables. Returns false when the
 * event id was already applied, or when the type is not one this addon handles.
 */
export const applyStripeEvent = async (
  kysely: Kysely<PaymentDatabase>,
  logger: Logger,
  environmentId: string | null,
  event: StripeEvent
): Promise<boolean> => {
  const now = new Date().toISOString()

  if (isForeignEnvironment(environmentId, event.data.object)) {
    logger.debug(`stripe webhook: ${event.type} (${event.id}) belongs to another environment`)
    return false
  }

  if (!HANDLED.has(event.type)) {
    // Not recorded either: the event row exists to make a retry a no-op, and
    // there is nothing to repeat for an event this addon never applied.
    logger.debug(`stripe webhook: no handler for ${event.type}`)
    return false
  }

  const recorded = await kysely
    .insertInto('paymentWebhookEvent')
    .values({ id: event.id, type: event.type, status: 'processing', receivedAt: now })
    .onConflict((oc) => oc.column('id').doNothing())
    .executeTakeFirst()

  if (!recorded.numInsertedOrUpdatedRows) {
    return false
  }

  const object = event.data.object

  // The dedupe insert above already claimed this event id, so a throw from
  // here would leave the row stuck on `processing` and Stripe's retry would
  // be swallowed as a duplicate. Releasing the claim makes the retry work.
  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        await settleCheckoutSession(kysely, logger, object, now)
        break
      }
      case 'checkout.session.async_payment_failed': {
        await kysely
          .updateTable('paymentOrder')
          .set({ status: 'failed', updatedAt: now })
          .where('stripeCheckoutSessionId', '=', asString(object.id))
          .execute()
        break
      }
      case 'checkout.session.expired': {
        // The customer never paid and never will on this session. Marking it
        // terminal keeps the pending list a list of live checkouts.
        await kysely
          .updateTable('paymentOrder')
          .set({ status: 'expired', updatedAt: now })
          .where('stripeCheckoutSessionId', '=', asString(object.id))
          .where('status', '=', 'pending')
          .execute()
        break
      }
      case 'payment_intent.payment_failed': {
        await kysely
          .updateTable('paymentOrder')
          .set({ status: 'failed', updatedAt: now })
          .where('stripePaymentIntentId', '=', asString(object.id))
          .execute()
        break
      }
      case 'charge.refunded': {
        const refunded = asNumber(object.amount_refunded) ?? 0
        const captured = asNumber(object.amount_captured) ?? asNumber(object.amount) ?? 0
        await kysely
          .updateTable('paymentOrder')
          .set({
            amountRefundedMinor: refunded,
            status: refunded >= captured && captured > 0 ? 'refunded' : 'paid',
            updatedAt: now,
          })
          .where('stripePaymentIntentId', '=', asString(object.payment_intent))
          .execute()
        break
      }
      case 'charge.dispute.created':
      case 'charge.dispute.closed': {
        // A dispute is not a refund: the money is held, the order stays as it
        // was, and the outcome may still go either way. Recording it separately
        // keeps the shipping queue honest without rewriting payment state.
        const outcome = asString(object.status)
        const disputeStatus =
          outcome === 'won' ? 'won' : outcome === 'lost' ? 'lost' : 'open'
        await kysely
          .updateTable('paymentOrder')
          .set({ disputeStatus, updatedAt: now })
          .where('stripePaymentIntentId', '=', asString(object.payment_intent))
          .execute()
        break
      }
    }
  } catch (error) {
    await kysely.deleteFrom('paymentWebhookEvent').where('id', '=', event.id).execute()
    throw error
  }

  await kysely
    .updateTable('paymentWebhookEvent')
    .set({ status: 'processed' })
    .where('id', '=', event.id)
    .execute()


  return true
}

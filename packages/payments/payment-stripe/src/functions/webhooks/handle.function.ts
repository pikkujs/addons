import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import { settleCheckoutSession } from '../../lib/settle-order.js'
import type { Kysely } from 'kysely'
import type { PaymentDatabase } from '../../../types/application-types.js'

export const HandleStripeWebhookInput = z.object({}).loose()

export const HandleStripeWebhookOutput = z.object({
  received: z.boolean().describe('Always true once the signature verifies'),
  eventId: z.string().describe('The verified Stripe event id (evt_...)'),
  type: z.string().describe('The Stripe event type'),
  processed: z.boolean().describe('False when this event id was already applied'),
})

type StripeEvent = {
  id: string
  type: string
  data: { object: Record<string, unknown> }
}

const asString = (value: unknown): string | null => (typeof value === 'string' ? value : null)

const asEpochString = (value: unknown): string | null =>
  typeof value === 'number' ? new Date(value * 1000).toISOString() : null

const asNumber = (value: unknown): number | null => (typeof value === 'number' ? value : null)

type SubscriptionItems =
  | { data?: Array<{ price?: { id?: string }; current_period_end?: unknown }> }
  | undefined

/**
 * Maps a Stripe customer id onto this addon's row, so a subscription created
 * anywhere — the storefront, a billing portal, the dashboard — hangs off the
 * same buyer. Null when the customer was never seen here, which is what a
 * subscription owned by another part of the app looks like.
 */
const localCustomerId = async (
  kysely: Kysely<PaymentDatabase>,
  stripeCustomerId: string | null
): Promise<string | null> => {
  if (!stripeCustomerId) {
    return null
  }
  const row = await kysely
    .selectFrom('paymentCustomer')
    .select(['id'])
    .where('stripeCustomerId', '=', stripeCustomerId)
    .executeTakeFirst()
  return row?.id ?? null
}

/**
 * `POST` receiver for Stripe webhooks.
 *
 * Verifies against the raw request bytes, records the event id, then applies it
 * to this addon's own tables. Processing is inline rather than queued: Stripe
 * retries any non-2xx, and the event-id insert makes a retry a no-op, so a
 * queue would add a dependency without adding a guarantee.
 *
 * Wire it in the consuming app:
 *   wireHTTP({ method: 'post', route: '/webhooks/stripe',
 *     func: addon('payment-stripe:handleStripeWebhook'), auth: false })
 */
export const handleStripeWebhook = pikkuSessionlessFunc({
  auth: false,
  description:
    'Verify a Stripe webhook against the raw body and apply it to the payment tables, ignoring events already processed',
  input: HandleStripeWebhookInput,
  output: HandleStripeWebhookOutput,
  tags: ['addon'],
  func: async ({ stripeSignature, kysely, logger }, _payload, { http }) => {
    const request = http?.request
    const signature = request?.header('stripe-signature') ?? request?.headers()['stripe-signature']
    if (!signature) {
      throw new UnauthorizedError('Missing stripe-signature header')
    }
    if (!stripeSignature.configured) {
      logger.error('STRIPE_WEBHOOK_SECRET is not configured — the webhook receiver is disabled')
      throw new UnauthorizedError('Webhook receiver is not configured')
    }

    const body = request?.arrayBuffer ? new TextDecoder().decode(await request.arrayBuffer()) : null
    if (body === null) {
      throw new BadRequestError('Cannot read the raw request body for signature verification')
    }

    try {
      await stripeSignature.verify(body, signature)
    } catch (error) {
      logger.warn(`stripe webhook signature verification failed: ${(error as Error).message}`)
      throw new UnauthorizedError('Invalid Stripe webhook signature')
    }

    const event = JSON.parse(body) as StripeEvent
    const now = new Date().toISOString()

    const recorded = await kysely
      .insertInto('paymentWebhookEvent')
      .values({ id: event.id, type: event.type, status: 'processing', receivedAt: now })
      .onConflict((oc) => oc.column('id').doNothing())
      .executeTakeFirst()

    if (!recorded.numInsertedOrUpdatedRows) {
      return { received: true, eventId: event.id, type: event.type, processed: false }
    }

    const object = event.data.object

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
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscriptionId = asString(object.id)
        if (subscriptionId) {
          const items = object.items as SubscriptionItems
          const firstItem = items?.data?.[0]
          // Stripe moved the period boundary off the subscription and onto each
          // item in API version 2025-03-31. The addon does not pin a version, so
          // it reads whichever the account sends.
          const currentPeriodEnd =
            asEpochString(object.current_period_end) ??
            asEpochString(firstItem?.current_period_end)
          const customerId = await localCustomerId(kysely, asString(object.customer))
          await kysely
            .insertInto('paymentSubscription')
            .values({
              id: crypto.randomUUID(),
              customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: firstItem?.price?.id ?? null,
              status: asString(object.status) ?? 'unknown',
              currentPeriodEnd,
              cancelAtPeriodEnd: object.cancel_at_period_end === true ? 1 : 0,
              createdAt: now,
              updatedAt: now,
            })
            .onConflict((oc) =>
              oc.column('stripeSubscriptionId').doUpdateSet({
                ...(customerId ? { customerId } : {}),
                status: asString(object.status) ?? 'unknown',
                currentPeriodEnd,
                cancelAtPeriodEnd: object.cancel_at_period_end === true ? 1 : 0,
                updatedAt: now,
              })
            )
            .execute()
        }
        break
      }
      default:
        logger.debug(`stripe webhook: no handler for ${event.type}`)
    }

    await kysely
      .updateTable('paymentWebhookEvent')
      .set({ status: 'processed' })
      .where('id', '=', event.id)
      .execute()

    return { received: true, eventId: event.id, type: event.type, processed: true }
  },
})

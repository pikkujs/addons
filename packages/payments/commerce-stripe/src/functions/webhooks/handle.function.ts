import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import { applyStripeEvent, type StripeEvent } from '../../lib/apply-stripe-event.js'
import type { Kysely } from 'kysely'
import type { PaymentDatabase } from '../../../types/application-types.js'

export const HandleStripeWebhookInput = z.object({}).loose()

export const HandleStripeWebhookOutput = z.object({
  received: z.boolean().describe('Always true once the signature verifies'),
  eventId: z.string().describe('The verified Stripe event id (evt_...)'),
  type: z.string().describe('The Stripe event type'),
  processed: z
    .boolean()
    .describe('False when this event id was already applied, or when the type is not one this addon handles'),
})

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
 *     func: addon('shop:handleStripeWebhook'), auth: false })
 */
export const handleStripeWebhook = pikkuSessionlessFunc({
  auth: false,
  description:
    'Verify a Stripe webhook against the raw body and apply it to the payment tables, ignoring events already processed',
  input: HandleStripeWebhookInput,
  output: HandleStripeWebhookOutput,
  tags: ['addon'],
  func: async ({ stripeSignatureFor, kysely, logger }, _payload, { http }) => {
    const request = http?.request
    // Which account's endpoint received this: configured on the URL by the host
    // app (e.g. `/webhooks/stripe?account=cc-eu`). Absent, the default secret.
    const rawAccount = request?.query?.()?.account
    const firstAccount = Array.isArray(rawAccount) ? rawAccount[0] : rawAccount
    const account = typeof firstAccount === 'string' ? firstAccount : null
    const stripeSignature = stripeSignatureFor(account)
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
    const processed = await applyStripeEvent(kysely, logger, event)
    return { received: true, eventId: event.id, type: event.type, processed }
  },
})

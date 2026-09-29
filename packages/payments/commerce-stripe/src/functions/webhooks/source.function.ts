import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'
import { applyStripeEvent, type StripeEvent } from '../../lib/apply-stripe-event.js'

/**
 * The `receive` step of a Stripe webhook source. Verifies `Stripe-Signature`
 * with the secret of the account named on the URL (`?account=cc-eu`, see
 * `STRIPE_WEBHOOK_SECRETS`), or the default one, and names each event after its
 * Stripe `type`, keyed by its id.
 *
 * Wire it in the consuming app, with `applyStripeWebhookEvent` as the trigger
 * for the events this addon handles:
 *   wireTriggerWebhookSource({
 *     name: 'stripe',
 *     receive: ref('shop:receiveStripeWebhook'),
 *   })
 */
export const receiveStripeWebhook = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Stripe webhook and read it into trigger events',
  func: async ({ stripeSignatureFor }, { body, headers, query }) => {
    const stripeSignature = stripeSignatureFor(query.account ?? null)
    const signature = headers['stripe-signature']
    if (!signature) {
      throw new UnauthorizedError('Missing stripe-signature header')
    }
    if (!stripeSignature.configured) {
      throw new UnauthorizedError('Webhook receiver is not configured')
    }
    const raw = new TextDecoder().decode(body)
    try {
      await stripeSignature.verify(raw, signature)
    } catch {
      throw new UnauthorizedError('Invalid Stripe webhook signature')
    }
    const event = JSON.parse(raw) as StripeEvent
    return { events: [{ name: event.type, id: event.id, data: event }] }
  },
})

export const ApplyStripeWebhookEventInput = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({ object: z.record(z.string(), z.unknown()) }),
})

export const ApplyStripeWebhookEventOutput = z.object({
  processed: z.boolean().describe('False when the event was already applied, or is of a type this addon does not handle'),
})

/**
 * Apply a verified Stripe event to the payment tables: the trigger for the
 * `stripe` webhook source's `checkout.session.*`, `payment_intent.payment_failed`,
 * `charge.refunded` and `charge.dispute.*` events. An event already applied,
 * or of a type this addon does not handle, is a no-op.
 */
export const applyStripeWebhookEvent = pikkuSessionlessFunc({
  auth: false,
  description: 'Apply a verified Stripe event to the payment tables, ignoring events already processed',
  input: ApplyStripeWebhookEventInput,
  output: ApplyStripeWebhookEventOutput,
  tags: ['addon'],
  func: async ({ kysely, logger }, event) => ({
    processed: await applyStripeEvent(kysely, logger, event),
  }),
})

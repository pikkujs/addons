import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

/**
 * Queue topic that verified Stripe events are published onto. The consuming
 * app wires a `wireQueueWorker({ name: STRIPE_WEBHOOK_QUEUE, ... })` to map
 * events to its own domain (plans, balances, ...). See docs/stripe-billing.md
 * in fabric for the reference consumer.
 */
export const STRIPE_WEBHOOK_QUEUE = 'stripe-webhook-event'

// Stripe events carry a large, evolving shape. We never trust the parsed body —
// the bytes are re-verified against the signing secret — so the input is a
// permissive passthrough purely to satisfy wiring.
export const StripeWebhookInput = z.object({}).passthrough()

export const StripeWebhookOutput = z.object({
  received: z.boolean().describe('Always true once the event is verified and enqueued'),
  eventId: z.string().describe('The verified Stripe event id (evt_...)'),
  type: z.string().describe('The Stripe event type that was enqueued'),
  jobId: z.string().describe('The queue job id the event was published as'),
})

/**
 * `POST` receiver for Stripe webhooks. Verifies the signature against the raw
 * request bytes + `STRIPE_WEBHOOK_SECRET`, then publishes the verified event
 * onto the `stripe-webhook-event` queue and returns 200 immediately. All
 * domain mapping (plan changes, pot credits) happens in the consumer's queue
 * worker, so this stays generic and reusable.
 *
 * Wire it in the consuming app, e.g.:
 *   wireHTTPRoutes({ routes: { stripe: { webhook: {
 *     method: 'post', route: '/webhooks/stripe',
 *     func: addon('stripe:stripeWebhookHandler'), auth: false,
 *   } } } })
 */
export const stripeWebhookHandler = pikkuSessionlessFunc({
  auth: false,
  description:
    'Verify a Stripe webhook signature against the raw body and enqueue the verified event onto the stripe-webhook-event queue for the consuming app to process.',
  input: StripeWebhookInput,
  output: StripeWebhookOutput,
  func: async ({ stripe, secrets, queueService, logger }, _payload, { http }) => {
    if (!queueService) {
      logger.error('stripe webhook: queueService is not configured on the host app')
      throw new Error('queueService is required to process Stripe webhooks')
    }

    const req = http?.request
    const readHeader = (name: string): string | undefined =>
      req?.header(name) ?? req?.headers()[name]

    const signature = readHeader('stripe-signature')
    if (!signature) {
      throw new UnauthorizedError('Missing stripe-signature header')
    }

    const webhookSecret = await secrets
      .getSecret('STRIPE_WEBHOOK_SECRET' as any)
      .catch(() => undefined)
    if (!webhookSecret) {
      logger.error('STRIPE_WEBHOOK_SECRET is not configured — webhook is disabled')
      throw new UnauthorizedError('Webhook receiver is not configured')
    }

    // Signature is over the EXACT request bytes — never re-stringify the parsed
    // body (key order / whitespace would break verification).
    const rawBody = req?.arrayBuffer ? Buffer.from(await req.arrayBuffer()) : null
    if (!rawBody) {
      throw new BadRequestError('Cannot read raw request body for signature verification')
    }

    let event: { id: string; type: string }
    try {
      // Async variant uses SubtleCrypto so it works on edge/worker runtimes too.
      event = (await stripe.webhooks.constructEventAsync(
        rawBody,
        signature,
        webhookSecret,
      )) as { id: string; type: string }
    } catch (e: any) {
      logger.warn(`stripe webhook signature verification failed: ${e?.message}`)
      throw new UnauthorizedError('Invalid Stripe webhook signature')
    }

    // Publish the verified event. The consumer dedupes on event.id, so a
    // duplicate enqueue (Stripe retry) is harmless.
    const jobId = await queueService.add(STRIPE_WEBHOOK_QUEUE, {
      eventId: event.id,
      type: event.type,
      event,
    })

    logger.info(`stripe webhook: enqueued ${event.type} (${event.id}) as job ${jobId}`)
    return { received: true, eventId: event.id, type: event.type, jobId }
  },
})

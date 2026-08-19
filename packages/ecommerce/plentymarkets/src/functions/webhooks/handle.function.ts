import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

/**
 * Queue topic that received PlentyMarkets webhook events are published onto. The
 * consuming app wires a `wireQueueWorker({ name: PLENTYMARKETS_WEBHOOK_QUEUE, ... })`
 * to map events to its own domain (resync invoices, products, ...). Keeping the mapping
 * in the consumer is what lets this handler stay generic and reusable.
 */
export const PLENTYMARKETS_WEBHOOK_QUEUE = 'plentymarkets-webhook-event'

// PlentyMarkets events carry an evolving shape. The body is a permissive passthrough:
// the handler only reads `type` and `id` off it and forwards the whole thing.
export const PlentymarketsWebhookInput = z.object({}).passthrough()

export const PlentymarketsWebhookOutput = z.object({
  received: z.boolean().describe('Always true once the event is enqueued'),
  eventType: z.string().describe('The PlentyMarkets event type, e.g. order.updated'),
  externalId: z.string().describe("PlentyMarkets' own event id — the consumer's dedupe key"),
  jobId: z.string().describe('The queue job id the event was published as'),
})

/**
 * `POST` receiver for PlentyMarkets webhooks. PlentyMarkets frequently sends NO
 * signature, so — unlike the Stripe receiver — there is nothing to verify here. That is
 * safe because the event is only a TRIGGER: the consumer never trusts the body, it
 * resyncs the affected records from PlentyMarkets (whose returned state is the truth).
 * So a forged event at worst triggers a redundant resync. Edge anti-spam (an IP
 * allowlist / capability path) is a deployment concern, left to the host.
 *
 * It reads `type` (the event) and `id` (PlentyMarkets' own dedupe key), publishes the
 * whole event onto `plentymarkets-webhook-event`, and returns 200 immediately. All
 * domain mapping happens in the consumer's queue worker.
 *
 * The route is wired in `../webhooks.http.ts` so the ingress ships with the addon.
 */
export const plentymarketsWebhookHandler = pikkuSessionlessFunc({
  auth: false,
  description:
    'Receive a PlentyMarkets webhook and enqueue it onto the plentymarkets-webhook-event queue for the consuming app to resync.',
  input: PlentymarketsWebhookInput,
  output: PlentymarketsWebhookOutput,
  func: async ({ queueService, logger }, _payload, { http }) => {
    if (!queueService) {
      logger.error('plentymarkets webhook: queueService is not configured on the host app')
      throw new Error('queueService is required to process PlentyMarkets webhooks')
    }

    const req = http?.request
    const raw = req?.arrayBuffer ? new TextDecoder().decode(await req.arrayBuffer()) : null
    if (!raw) {
      throw new BadRequestError('Cannot read PlentyMarkets webhook request body')
    }

    let body: Record<string, unknown>
    try {
      body = JSON.parse(raw) as Record<string, unknown>
    } catch {
      throw new BadRequestError('PlentyMarkets webhook body is not valid JSON')
    }

    const eventType = typeof body.type === 'string' ? body.type : null
    const externalId = body.id === undefined || body.id === null ? null : String(body.id)
    if (!eventType || !externalId) {
      throw new BadRequestError("PlentyMarkets webhook is missing 'type' or 'id'")
    }

    const jobId = await queueService.add(PLENTYMARKETS_WEBHOOK_QUEUE, {
      eventType,
      externalId,
      event: body,
    })

    logger.info(`plentymarkets webhook: enqueued ${eventType} (${externalId}) as job ${jobId}`)
    return { received: true, eventType, externalId, jobId }
  },
})

import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Asana webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Asana webhook source. Echoes `X-Hook-Secret` for the handshake Asana makes when a webhook is created, then verifies `X-Hook-Signature` with that secret (the `ASANA_WEBHOOK_SECRET` secret, which the app must store from the handshake). Asana batches events, so each becomes its own event named `<resource_type>.<action>` (`task.added`, `task.changed`, ...).
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'asana',
 *     secret: 'ASANA_WEBHOOK_SECRET',
 *     receive: ref('asana:asanaWebhookReceive'),
 *   })
 */
export const asanaWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Asana webhook and read it into trigger events',
  func: async ({ asanaWebhookSecret }, { body, headers }) => {
    const handshake = headers['x-hook-secret']
    if (handshake) {
      return { respond: { status: 200, headers: { 'x-hook-secret': handshake } } }
    }
    const raw = new TextDecoder().decode(body)
    asanaWebhookSecret.verifyHmac(headers['x-hook-signature'], 'sha256', raw, 'hex')
    return {
      events: (parseJson(raw).events ?? []).map((event: any) => ({
        name: `${event.resource?.resource_type}.${event.action}`,
        data: event,
      })),
    }
  },
})

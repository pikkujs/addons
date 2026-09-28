import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Linear webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Linear webhook source. Verifies `Linear-Signature` over the raw body, refuses deliveries more than a minute old, and names the event after the resource `type` (`Issue`, `Comment`, `Project`, ...), keyed by `Linear-Delivery`. The `action` (`create`, `update`, `remove`) is in the data.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'linear',
 *     secret: 'LINEAR_WEBHOOK_SECRET',
 *     receive: ref('linear:linearWebhookReceive'),
 *   })
 */
export const linearWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Linear webhook and read it into trigger events',
  func: async ({ linearWebhookSecret }, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    linearWebhookSecret.verifyHmac(headers['linear-signature'], 'sha256', raw, 'hex')
    const data = parseJson(raw)
    if (Math.abs(Date.now() - Number(data.webhookTimestamp)) > 60_000) {
      throw new UnauthorizedError('Stale Linear webhook')
    }
    return {
      events: [{ name: String(data.type), id: headers['linear-delivery'], data }],
    }
  },
})

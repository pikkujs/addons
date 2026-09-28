import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Wise webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Wise webhook source. Verifies `X-Signature-SHA256` against Wise's public key and names the event after `event_type` (`transfers#state-change`, `balances#credit`, ...), keyed by `X-Delivery-Id`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'wise',
 *     secret: 'WISE_WEBHOOK_PUBLIC_KEY',
 *     receive: ref('wise:wiseWebhookReceive'),
 *   })
 */
export const wiseWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Wise webhook and read it into trigger events',
  func: async ({ wiseWebhookSecret }, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    wiseWebhookSecret.verifyPublicKey(headers['x-signature-sha256'], raw)
    const data = parseJson(raw)
    return {
      events: [{ name: String(data.event_type), id: headers['x-delivery-id'], data }],
    }
  },
})

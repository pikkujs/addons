import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Zendesk webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Zendesk webhook source. Verifies `X-Zendesk-Webhook-Signature` over `timestamp + body` and names the event after `type` (`zen:event-type:ticket.created`, ...), keyed by `id`. Payloads from a trigger or automation carry no `type` and are named `trigger`.
 */
export const zendeskWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Zendesk webhook and read it into trigger events',
  func: async ({ zendeskWebhookSecret }, { body, headers }) => {
    const signing = await zendeskWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(
      headers['x-zendesk-webhook-signature'],
      'sha256',
      `${headers['x-zendesk-webhook-signature-timestamp']}${raw}`,
      'base64'
    )
    const data = parseJson(raw)
    return { events: [{ name: data.type ?? 'trigger', id: data.id, data }] }
  },
})

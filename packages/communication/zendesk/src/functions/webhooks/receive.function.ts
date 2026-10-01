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
 * The `receive` step of a Zendesk webhook source. Names the event after `type` (`zen:event-type:ticket.created`, ...), keyed by `id`. Payloads from a trigger or automation carry no `type` and are named `trigger`.
 */
export const zendeskWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Zendesk webhook into trigger events',
  func: async (_services, { body }) => {
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    return { events: [{ name: data.type ?? 'trigger', id: data.id, data }] }
  },
})

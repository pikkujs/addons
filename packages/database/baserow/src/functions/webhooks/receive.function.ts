import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Baserow webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Baserow webhook source. Baserow signs nothing, so the webhook is given an `X-Webhook-Token` header. The event is named after `event_type` (`rows.created`, `rows.updated`, `rows.deleted`), keyed by `event_id`.
 */
export const baserowWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Baserow webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(new TextDecoder().decode(body))
    return { events: [{ name: data.event_type, id: data.event_id, data }] }
  },
})

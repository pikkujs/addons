import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Baserow webhook source. Baserow signs nothing, so the webhook is given an `X-Webhook-Token` header. The event is named after `event_type` (`rows.created`, `rows.updated`, `rows.deleted`), keyed by `event_id`.
 */
export const baserowWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Baserow webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
    return { events: [{ name: data.event_type, id: data.event_id, data }] }
  },
})

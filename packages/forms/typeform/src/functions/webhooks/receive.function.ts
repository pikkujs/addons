import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Typeform webhook source. Names the event after `event_type` (`form_response`), keyed by `event_id`.
 */
export const typeformWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Typeform webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
    return { events: [{ name: data.event_type, id: data.event_id, data }] }
  },
})

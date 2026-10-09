import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Paddle webhook source. Names the event after `event_type` (`transaction.completed`, `subscription.updated`, ...), keyed by `event_id`.
 */
export const paddleWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Paddle webhook into trigger events',
  func: async (_services, { body }) => {
    const data = parseJson(body)
    return { events: [{ name: data.event_type, id: data.event_id, data }] }
  },
})

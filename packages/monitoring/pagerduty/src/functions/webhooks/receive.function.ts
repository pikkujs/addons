import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a PagerDuty webhook source. Names the event after `event.event_type` (`incident.triggered`, `incident.resolved`, ...), keyed by `event.id`.
 */
export const pagerdutyWebhookReceive = pikkuWebhookReceive({
  description: 'Read a PagerDuty webhook into trigger events',
  func: async (_services, { body }) => {
    const { event } = parseJson(body)
    return { events: [{ name: event.event_type, id: event.id, data: event }] }
  },
})

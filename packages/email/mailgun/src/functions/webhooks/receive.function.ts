import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Mailgun webhook source. Names the event the way Mailgun's webhook settings do (`delivered`, `opened`, `clicked`, `permanent_fail`, `temporary_fail`, `unsubscribed`, `complained`), keyed by the event's `id`.
 */
export const mailgunWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Mailgun webhook into trigger events',
  func: async (_services, { body }) => {
    const { 'event-data': event } = parseJson(body)
    const name =
      event.event === 'failed'
        ? event.severity === 'permanent'
          ? 'permanent_fail'
          : 'temporary_fail'
        : event.event
    return { events: [{ name, id: event.id, data: event }] }
  },
})

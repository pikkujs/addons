import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a SendGrid webhook source. SendGrid batches events, so each becomes its own event, named after `event` (`delivered`, `open`, `bounce`, ...) and keyed by `sg_event_id`.
 */
export const sendgridWebhookReceive = pikkuWebhookReceive({
  description: 'Read a SendGrid webhook into trigger events',
  func: async (_services, { body }) => {
    return {
      events: parseJson(body).map((event: any) => ({
        name: event.event,
        id: event.sg_event_id,
        data: event,
      })),
    }
  },
})

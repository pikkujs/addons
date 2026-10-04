import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Mailjet webhook source. Mailjet signs nothing, so the event URL carries a token of your choosing (`/webhooks/mailjet?token=...`). Grouped deliveries become one event each, named after `event` (`sent`, `open`, `bounce`, ...).
 */
export const mailjetWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Mailjet webhook into trigger events',
  func: async (_services, { body }) => {
    const data = parseJson(body)
    return {
      events: [data].flat().map((event: any) => ({
        name: event.event,
        id: `${event.MessageID}:${event.event}:${event.time}`,
        data: event,
      })),
    }
  },
})

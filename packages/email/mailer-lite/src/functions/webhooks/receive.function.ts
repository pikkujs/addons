import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a MailerLite webhook source. Batched deliveries become one event each; every event is named after its `type` (`subscriber.created`, `campaign.sent`, ...).
 */
export const mailerLiteWebhookReceive = pikkuWebhookReceive({
  description: 'Read a MailerLite webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
    return {
      events: (data.events ?? [data]).map((event: any) => ({
        name: event.type ?? event.event,
        id: event.id,
        data: event,
      })),
    }
  },
})

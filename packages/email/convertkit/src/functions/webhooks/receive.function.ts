import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Kit webhook source. Kit signs nothing and leaves the event name out of the payload, so the webhook URL carries both: a token of your choosing and the event it was registered for (`/webhooks/convertkit?token=...&event=subscriber.subscriber_activate`).
 */
export const convertkitWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Kit webhook into trigger events',
  func: async (_services, { body, query }) => {
    return {
      events: [{ name: query.event ?? '', data: parseJson(body) }],
    }
  },
})

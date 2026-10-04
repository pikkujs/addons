import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Ghost webhook source. Ghost leaves the event out of the payload, so the webhook URL names it (`/webhooks/ghost?event=post.published`).
 */
export const ghostWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Ghost webhook into trigger events',
  func: async (_services, { body, query }) => {
    return { events: [{ name: query.event ?? '', data: parseJson(body) }] }
  },
})

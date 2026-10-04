import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Strapi webhook source. Strapi signs nothing, so the webhook is given an `Authorization` header. The event is named after `event` (`entry.create`, `entry.publish`, `media.update`, ...).
 */
export const strapiWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Strapi webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
    return { events: [{ name: data.event, data }] }
  },
})

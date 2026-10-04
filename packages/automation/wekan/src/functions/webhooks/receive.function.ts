import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Wekan webhook source. Wekan signs nothing, so the outgoing webhook URL carries a token of your choosing (`/webhooks/wekan?token=...`). The event is named after the activity's `description` (`act-createCard`, `act-moveCard`, ...).
 */
export const wekanWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Wekan webhook into trigger events',
  func: async (_services, { body }) => {
    const data = parseJson(body)
    return { events: [{ name: data.description ?? '', data }] }
  },
})

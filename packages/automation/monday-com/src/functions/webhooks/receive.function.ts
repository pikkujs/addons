import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a monday.com webhook source. Answers the `challenge` monday.com posts when a webhook is created. monday.com signs nothing for board webhooks, so the URL carries a token of your choosing (`/webhooks/monday-com?token=...`). The event is named after `event.type` (`create_pulse`, `update_column_value`, ...), keyed by `event.triggerUuid`.
 */
export const mondayComWebhookReceive = pikkuWebhookReceive({
  description: 'Read a monday.com webhook into trigger events',
  func: async (_services, { body }, { http }) => {
    const data = parseJson(body)
    if (data.challenge) {
      http.response.status(200).json({ challenge: data.challenge })
      return
    }
    return {
      events: [{ name: data.event.type, id: data.event.triggerUuid, data: data.event }],
    }
  },
})

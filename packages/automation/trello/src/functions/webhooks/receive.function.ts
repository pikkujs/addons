import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Trello webhook source. Answers the HEAD request Trello checks the callback URL with and names the event after the action's `type` (`createCard`, `updateCard`, ...), keyed by the action's `id`.
 */
export const trelloWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Trello webhook into trigger events',
  func: async ({ variables }, { body }) => {
    const data = parseJson(body)
    return { events: [{ name: data.action.type, id: data.action.id, data }] }
  },
})

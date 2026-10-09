import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a ClickUp webhook source. Names the event after `event` (`taskCreated`, `taskUpdated`, ...).
 */
export const clickupWebhookReceive = pikkuWebhookReceive({
  description: 'Read a ClickUp webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
    return {
      events: [
        {
          name: data.event,
          id: data.history_items?.[0]?.id,
          data,
        },
      ],
    }
  },
})

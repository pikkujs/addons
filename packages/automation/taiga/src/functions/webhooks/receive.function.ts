import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Taiga webhook source. Names the event `<type>.<action>` (`userstory.create`, `issue.change`, ...).
 */
export const taigaWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Taiga webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
    return { events: [{ name: `${data.type}.${data.action}`, data }] }
  },
})

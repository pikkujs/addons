import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Zendesk webhook source. Names the event after `type` (`zen:event-type:ticket.created`, ...), keyed by `id`. Payloads from a trigger or automation carry no `type` and are named `trigger`.
 */
export const zendeskWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Zendesk webhook into trigger events',
  func: async (_services, { body }) => {
    const data = parseJson(body)
    return { events: [{ name: data.type ?? 'trigger', id: data.id, data }] }
  },
})

import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Airtable webhook source. Airtable's notification only says a base changed: it becomes a `changed` event, and the consumer lists the webhook's payloads to see what.
 */
export const airtableWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Airtable webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
    return { events: [{ name: 'changed', id: `${data.webhook?.id}:${data.timestamp}`, data }] }
  },
})

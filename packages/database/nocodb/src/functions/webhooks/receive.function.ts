import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a NocoDB webhook source. NocoDB signs nothing, so the webhook is given an `X-Webhook-Token` header. The event is named after `type` (`records.after.insert`, `records.after.update`, ...), keyed by `id`.
 */
export const nocodbWebhookReceive = pikkuWebhookReceive({
  description: 'Read a NocoDB webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
    return { events: [{ name: data.type, id: data.id, data }] }
  },
})

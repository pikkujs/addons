import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'
import { UnauthorizedError } from '@pikku/core/errors'

/**
 * The `receive` step of a Linear webhook source. Refuses deliveries more than a minute old and names the event after the resource `type` (`Issue`, `Comment`, `Project`, ...), keyed by `Linear-Delivery`. The `action` (`create`, `update`, `remove`) is in the data.
 */
export const linearWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Linear webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
    if (Math.abs(Date.now() - Number(data.webhookTimestamp)) > 60_000) {
      throw new UnauthorizedError('Stale Linear webhook')
    }
    return {
      events: [{ name: String(data.type), id: headers['linear-delivery'], data }],
    }
  },
})

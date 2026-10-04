import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Wise webhook source. Names the event after `event_type` (`transfers#state-change`, `balances#credit`, ...), keyed by `X-Delivery-Id`.
 */
export const wiseWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Wise webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
    return {
      events: [{ name: String(data.event_type), id: headers['x-delivery-id'], data }],
    }
  },
})

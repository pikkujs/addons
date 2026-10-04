import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Zammad webhook source. Zammad webhooks fire from triggers, so the event is named after `X-Zammad-Trigger`, keyed by `X-Zammad-Delivery`.
 */
export const zammadWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Zammad webhook into trigger events',
  func: async (_services, { body, headers }) => {
    return {
      events: [
        {
          name: headers['x-zammad-trigger'] ?? '',
          id: headers['x-zammad-delivery'],
          data: parseJson(body),
        },
      ],
    }
  },
})

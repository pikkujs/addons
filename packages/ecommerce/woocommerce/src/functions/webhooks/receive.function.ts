import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a WooCommerce webhook source. Names the event after `X-WC-Webhook-Topic` (`order.created`, `product.updated`, ...), keyed by `X-WC-Webhook-Delivery-ID`. The unsigned ping WooCommerce sends when the webhook is saved is acknowledged and dropped.
 */
export const woocommerceWebhookReceive = pikkuWebhookReceive({
  description: 'Read a WooCommerce webhook into trigger events',
  func: async (_services, { body, headers }, { http }) => {
    const name = headers['x-wc-webhook-topic']
    if (!name) {
      http.response.status(200)
      return
    }
    return {
      events: [
        { name, id: headers['x-wc-webhook-delivery-id'], data: parseJson(body) },
      ],
    }
  },
})

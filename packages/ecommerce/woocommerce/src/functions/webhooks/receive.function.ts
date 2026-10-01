import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('WooCommerce webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a WooCommerce webhook source. Names the event after `X-WC-Webhook-Topic` (`order.created`, `product.updated`, ...), keyed by `X-WC-Webhook-Delivery-ID`. The unsigned ping WooCommerce sends when the webhook is saved is acknowledged and dropped.
 */
export const woocommerceWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a WooCommerce webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const name = headers['x-wc-webhook-topic']
    if (!name) {
      return { respond: { status: 200 } }
    }
    const raw = new TextDecoder().decode(body)
    return {
      events: [
        { name, id: headers['x-wc-webhook-delivery-id'], data: parseJson(raw) },
      ],
    }
  },
})

import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'
import { BadRequestError } from '@pikku/core/errors'

/**
 * The `receive` step of a Shopify webhook source. Names the event after `X-Shopify-Topic` (`orders/create`, `products/update`, ...), keyed by `X-Shopify-Webhook-Id`.
 */
export const shopifyWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Shopify webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const name = headers['x-shopify-topic']
    if (!name) {
      throw new BadRequestError('Missing X-Shopify-Topic header')
    }
    return {
      events: [{ name, id: headers['x-shopify-webhook-id'], data: parseJson(body) }],
    }
  },
})

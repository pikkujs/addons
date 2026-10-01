import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Shopify webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Shopify webhook source. Names the event after `X-Shopify-Topic` (`orders/create`, `products/update`, ...), keyed by `X-Shopify-Webhook-Id`.
 */
export const shopifyWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Shopify webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    const name = headers['x-shopify-topic']
    if (!name) {
      throw new BadRequestError('Missing X-Shopify-Topic header')
    }
    return {
      events: [{ name, id: headers['x-shopify-webhook-id'], data: parseJson(raw) }],
    }
  },
})

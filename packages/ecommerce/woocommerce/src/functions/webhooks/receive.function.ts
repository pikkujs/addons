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
 * The `receive` step of a WooCommerce webhook source. Verifies `X-WC-Webhook-Signature` over the raw body and names the event after `X-WC-Webhook-Topic` (`order.created`, `product.updated`, ...), keyed by `X-WC-Webhook-Delivery-ID`. The unsigned ping WooCommerce sends when the webhook is saved is acknowledged and dropped.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'woocommerce',
 *     receive: ref('woocommerce:woocommerceWebhookReceive'),
 *   })
 */
export const woocommerceWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a WooCommerce webhook and read it into trigger events',
  func: async ({ woocommerceWebhookSecret }, { body, headers }) => {
    const signing = await woocommerceWebhookSecret.load()
    const name = headers['x-wc-webhook-topic']
    if (!name) {
      return { respond: { status: 200 } }
    }
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(
      headers['x-wc-webhook-signature'],
      'sha256',
      raw,
      'base64'
    )
    return {
      events: [
        { name, id: headers['x-wc-webhook-delivery-id'], data: parseJson(raw) },
      ],
    }
  },
})

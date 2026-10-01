import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { woocommerceWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'woocommerce',
  verify: ({ body, headers }, secret) =>
    // WooCommerce's ping on save has no topic and is only acknowledged.
    !headers['x-wc-webhook-topic'] ||
    verifyHmacSignature(secret, headers['x-wc-webhook-signature'], 'sha256', body, 'base64'),
  credentialDescription:
    "The secret set on the WooCommerce webhook",
  receive: woocommerceWebhookReceive,
})

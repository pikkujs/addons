import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { shopifyWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'shopify',
  verify: {
    hmac: {
      header: 'x-shopify-hmac-sha256',
      algorithm: 'sha256',
      encoding: 'base64',
    },
  },
  credentialDescription:
    "The app's client secret, which Shopify signs webhooks with",
  receive: shopifyWebhookReceive,
})

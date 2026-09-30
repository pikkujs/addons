import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { shopifyWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'shopify',
  receive: shopifyWebhookReceive,
})

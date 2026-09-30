import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { woocommerceWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'woocommerce',
  receive: woocommerceWebhookReceive,
})

import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { receiveStripeWebhook } from './functions/webhooks/source.function.js'

wireTriggerWebhookSource({
  name: 'stripe',
  receive: receiveStripeWebhook,
})

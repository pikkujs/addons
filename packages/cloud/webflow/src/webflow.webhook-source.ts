import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { webflowWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'webflow',
  receive: webflowWebhookReceive,
})

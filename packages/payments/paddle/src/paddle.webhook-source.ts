import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { paddleWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'paddle',
  receive: paddleWebhookReceive,
})

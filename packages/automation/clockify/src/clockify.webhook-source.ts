import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { clockifyWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'clockify',
  receive: clockifyWebhookReceive,
})

import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { clickupWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'clickup',
  receive: clickupWebhookReceive,
})

import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { asanaWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'asana',
  receive: asanaWebhookReceive,
})

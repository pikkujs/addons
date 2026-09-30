import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { baserowWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'baserow',
  receive: baserowWebhookReceive,
})

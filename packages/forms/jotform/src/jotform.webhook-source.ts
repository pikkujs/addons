import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { jotformWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'jotform',
  receive: jotformWebhookReceive,
})

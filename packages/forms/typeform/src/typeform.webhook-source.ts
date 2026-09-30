import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { typeformWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'typeform',
  receive: typeformWebhookReceive,
})

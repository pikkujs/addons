import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { formstackWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'formstack',
  receive: formstackWebhookReceive,
})

import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { mondayComWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'monday-com',
  receive: mondayComWebhookReceive,
})

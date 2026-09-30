import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { mailgunWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'mailgun',
  receive: mailgunWebhookReceive,
})

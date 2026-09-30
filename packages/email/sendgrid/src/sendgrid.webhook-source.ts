import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { sendgridWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'sendgrid',
  receive: sendgridWebhookReceive,
})

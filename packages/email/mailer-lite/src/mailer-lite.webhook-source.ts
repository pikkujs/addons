import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { mailerLiteWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'mailer-lite',
  receive: mailerLiteWebhookReceive,
})

import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { mailjetWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'mailjet',
  receive: mailjetWebhookReceive,
})

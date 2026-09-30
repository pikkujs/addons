import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { resendWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'resend',
  receive: resendWebhookReceive,
})

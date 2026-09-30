import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { twilioWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'twilio',
  receive: twilioWebhookReceive,
})

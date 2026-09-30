import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { whatsappWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'whatsapp',
  receive: whatsappWebhookReceive,
})

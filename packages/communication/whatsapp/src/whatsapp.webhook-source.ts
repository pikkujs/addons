import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { whatsappWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'whatsapp',
  method: ['get', 'post'],
  verify: {
    hmac: {
      header: 'x-hub-signature-256',
      prefix: 'sha256=',
      algorithm: 'sha256',
      encoding: 'hex',
    },
  },
  credentialDescription:
    "The Meta app's secret, which signs webhook deliveries",
  receive: whatsappWebhookReceive,
})

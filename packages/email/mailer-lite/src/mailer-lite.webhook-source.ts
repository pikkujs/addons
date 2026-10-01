import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { mailerLiteWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'mailer-lite',
  verify: {
    hmac: {
      header: 'signature',
      algorithm: 'sha256',
      encoding: 'hex',
    },
  },
  credentialDescription:
    "The webhook's signing secret",
  receive: mailerLiteWebhookReceive,
})

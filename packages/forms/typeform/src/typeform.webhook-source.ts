import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { typeformWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'typeform',
  verify: {
    hmac: {
      header: 'typeform-signature',
      prefix: 'sha256=',
      algorithm: 'sha256',
      encoding: 'base64',
    },
  },
  credentialDescription:
    "The secret set on the Typeform webhook",
  receive: typeformWebhookReceive,
})

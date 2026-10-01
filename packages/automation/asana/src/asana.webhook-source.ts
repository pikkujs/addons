import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { asanaWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'asana',
  verify: {
    hmac: {
      header: 'x-hook-signature',
      algorithm: 'sha256',
      encoding: 'hex',
    },
  },
  credentialDescription:
    "The X-Hook-Secret Asana sent in the handshake when the webhook was created",
  receive: asanaWebhookReceive,
})

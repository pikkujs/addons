import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { wiseWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'wise',
  verify: {
    publicKey: {
      header: 'x-signature-sha256',
    },
  },
  credentialDescription:
    "Wise's webhook signing public key, as PEM",
  receive: wiseWebhookReceive,
})

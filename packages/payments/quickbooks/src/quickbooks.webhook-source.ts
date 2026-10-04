import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { quickbooksWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'quickbooks',
  verify: {
    hmac: {
      header: 'intuit-signature',
      algorithm: 'sha256',
      encoding: 'base64',
    },
  },
  credentialDescription:
    "The app's webhook verifier token",
  receive: quickbooksWebhookReceive,
})

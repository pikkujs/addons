import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { linearWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'linear',
  verify: {
    hmac: {
      header: 'linear-signature',
      algorithm: 'sha256',
      encoding: 'hex',
    },
  },
  credentialDescription:
    "The Linear webhook's signing secret",
  receive: linearWebhookReceive,
})

import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { clickupWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'clickup',
  verify: {
    hmac: {
      header: 'x-signature',
      algorithm: 'sha256',
      encoding: 'hex',
    },
  },
  credentialDescription:
    "The secret ClickUp returned when the webhook was created",
  receive: clickupWebhookReceive,
})

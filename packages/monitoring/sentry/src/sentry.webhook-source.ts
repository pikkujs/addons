import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { sentryWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'sentry',
  verify: {
    hmac: {
      header: 'sentry-hook-signature',
      algorithm: 'sha256',
      encoding: 'hex',
    },
  },
  credentialDescription:
    "The integration's client secret",
  receive: sentryWebhookReceive,
})

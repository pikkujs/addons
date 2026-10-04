import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { clockifyWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'clockify',
  verify: {
    token: {
      header: 'clockify-signature',
    },
  },
  credentialDescription:
    "The webhook's signing token, which Clockify sends in Clockify-Signature",
  receive: clockifyWebhookReceive,
})

import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { baserowWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'baserow',
  verify: {
    token: {
      header: 'x-webhook-token',
    },
  },
  credentialDescription:
    "The value of a header added to the Baserow webhook as X-Webhook-Token",
  receive: baserowWebhookReceive,
})

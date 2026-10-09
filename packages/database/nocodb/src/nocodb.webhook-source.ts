import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { nocodbWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'nocodb',
  verify: {
    token: {
      header: 'x-webhook-token',
    },
  },
  credentialDescription:
    "The value of a header added to the NocoDB webhook as X-Webhook-Token",
  receive: nocodbWebhookReceive,
})

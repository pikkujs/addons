import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { strapiWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'strapi',
  verify: {
    token: {
      header: 'authorization',
    },
  },
  credentialDescription:
    "The value of the Authorization header set on the Strapi webhook",
  receive: strapiWebhookReceive,
})

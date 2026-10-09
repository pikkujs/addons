import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { storyblokWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'storyblok',
  verify: {
    hmac: {
      header: 'webhook-signature',
      algorithm: 'sha1',
      encoding: 'hex',
    },
  },
  credentialDescription:
    "The webhook's secret",
  receive: storyblokWebhookReceive,
})

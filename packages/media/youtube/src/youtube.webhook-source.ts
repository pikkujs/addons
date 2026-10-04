import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { youtubeWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'youtube',
  method: ['get', 'post'],
  verify: {
    hmac: {
      header: 'x-hub-signature',
      prefix: 'sha1=',
      algorithm: 'sha1',
      encoding: 'hex',
    },
  },
  credentialDescription:
    "The hub.secret given when subscribing to the channel feed",
  receive: youtubeWebhookReceive,
})

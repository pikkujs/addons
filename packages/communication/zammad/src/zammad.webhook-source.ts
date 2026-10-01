import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { zammadWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'zammad',
  verify: {
    hmac: {
      header: 'x-hub-signature',
      prefix: 'sha1=',
      algorithm: 'sha1',
      encoding: 'hex',
    },
  },
  credentialDescription:
    "The webhook's HMAC signature token",
  receive: zammadWebhookReceive,
})

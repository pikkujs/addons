import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { taigaWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'taiga',
  verify: {
    hmac: {
      header: 'x-taiga-webhook-signature',
      algorithm: 'sha1',
      encoding: 'hex',
    },
  },
  credentialDescription:
    "The webhook's secret key",
  receive: taigaWebhookReceive,
})

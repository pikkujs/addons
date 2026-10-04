import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { onfleetWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'onfleet',
  method: ['get', 'post'],
  verify: {
    hmac: {
      header: 'x-onfleet-signature',
      algorithm: 'sha512',
      encoding: 'hex',
      secretEncoding: 'hex',
    },
  },
  credentialDescription:
    "The organization's webhook secret, as hex",
  receive: onfleetWebhookReceive,
})

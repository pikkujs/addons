import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { githubWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'github',
  verify: {
    hmac: {
      header: 'x-hub-signature-256',
      prefix: 'sha256=',
      algorithm: 'sha256',
      encoding: 'hex',
    },
  },
  credentialDescription:
    'The secret set on the GitHub webhook, which GitHub signs each delivery with',
  receive: githubWebhookReceive,
})

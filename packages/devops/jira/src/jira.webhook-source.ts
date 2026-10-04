import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { jiraWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'jira',
  verify: {
    hmac: {
      header: 'x-hub-signature',
      prefix: 'sha256=',
      algorithm: 'sha256',
      encoding: 'hex',
    },
  },
  credentialDescription:
    "The secret set on the Jira webhook, which Jira signs each delivery with",
  receive: jiraWebhookReceive,
})

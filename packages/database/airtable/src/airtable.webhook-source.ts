import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { airtableWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'airtable',
  verify: {
    hmac: {
      header: 'x-airtable-content-mac',
      prefix: 'hmac-sha256=',
      algorithm: 'sha256',
      encoding: 'hex',
      secretEncoding: 'base64',
    },
  },
  credentialDescription:
    "The macSecretBase64 Airtable returned when the webhook was created",
  receive: airtableWebhookReceive,
})

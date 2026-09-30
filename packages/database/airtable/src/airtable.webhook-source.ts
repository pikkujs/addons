import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { airtableWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'airtable',
  receive: airtableWebhookReceive,
})

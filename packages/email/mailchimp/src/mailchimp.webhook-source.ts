import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { mailchimpWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'mailchimp',
  receive: mailchimpWebhookReceive,
})

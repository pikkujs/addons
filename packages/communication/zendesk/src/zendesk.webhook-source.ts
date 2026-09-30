import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { zendeskWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'zendesk',
  receive: zendeskWebhookReceive,
})

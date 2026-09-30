import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { freshdeskWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'freshdesk',
  receive: freshdeskWebhookReceive,
})

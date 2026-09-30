import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { quickbooksWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'quickbooks',
  receive: quickbooksWebhookReceive,
})

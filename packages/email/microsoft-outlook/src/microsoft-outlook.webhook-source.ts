import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { microsoftOutlookWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'microsoft-outlook',
  receive: microsoftOutlookWebhookReceive,
})

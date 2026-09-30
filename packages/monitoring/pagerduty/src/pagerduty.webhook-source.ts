import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { pagerdutyWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'pagerduty',
  receive: pagerdutyWebhookReceive,
})

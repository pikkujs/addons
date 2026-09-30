import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { onfleetWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'onfleet',
  receive: onfleetWebhookReceive,
})

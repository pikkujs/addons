import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { zoomWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'zoom',
  receive: zoomWebhookReceive,
})

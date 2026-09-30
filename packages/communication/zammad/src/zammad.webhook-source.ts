import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { zammadWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'zammad',
  receive: zammadWebhookReceive,
})

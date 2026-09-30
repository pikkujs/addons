import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { linearWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'linear',
  receive: linearWebhookReceive,
})

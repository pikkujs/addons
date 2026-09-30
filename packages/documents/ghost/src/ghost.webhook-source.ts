import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { ghostWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'ghost',
  receive: ghostWebhookReceive,
})

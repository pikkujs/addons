import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { taigaWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'taiga',
  receive: taigaWebhookReceive,
})

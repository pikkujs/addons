import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { telegramWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'telegram',
  receive: telegramWebhookReceive,
})

import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { trelloWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'trello',
  receive: trelloWebhookReceive,
})

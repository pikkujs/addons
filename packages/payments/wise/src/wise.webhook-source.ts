import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { wiseWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'wise',
  receive: wiseWebhookReceive,
})

import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { nocodbWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'nocodb',
  receive: nocodbWebhookReceive,
})

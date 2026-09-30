import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { wekanWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'wekan',
  receive: wekanWebhookReceive,
})

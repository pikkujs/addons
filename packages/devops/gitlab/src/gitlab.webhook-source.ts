import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { gitlabWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'gitlab',
  receive: gitlabWebhookReceive,
})

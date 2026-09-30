import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { convertkitWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'convertkit',
  receive: convertkitWebhookReceive,
})

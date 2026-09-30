import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { mandrillWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'mandrill',
  receive: mandrillWebhookReceive,
})

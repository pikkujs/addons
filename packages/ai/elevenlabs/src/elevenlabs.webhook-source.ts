import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { elevenlabsWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'elevenlabs',
  receive: elevenlabsWebhookReceive,
})

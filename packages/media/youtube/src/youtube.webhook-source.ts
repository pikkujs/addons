import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { youtubeWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'youtube',
  receive: youtubeWebhookReceive,
})

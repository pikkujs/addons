import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { storyblokWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'storyblok',
  receive: storyblokWebhookReceive,
})

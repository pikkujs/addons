import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { strapiWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'strapi',
  receive: strapiWebhookReceive,
})

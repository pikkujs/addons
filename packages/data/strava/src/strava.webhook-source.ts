import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { stravaWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'strava',
  method: ['get', 'post'],
  receive: stravaWebhookReceive,
})

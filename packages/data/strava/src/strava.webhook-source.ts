import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { stravaWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'strava',
  receive: stravaWebhookReceive,
})

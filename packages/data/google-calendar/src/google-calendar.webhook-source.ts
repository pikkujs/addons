import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { googleCalendarWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'google-calendar',
  receive: googleCalendarWebhookReceive,
})

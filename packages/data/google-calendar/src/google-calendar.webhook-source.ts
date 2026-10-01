import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { googleCalendarWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'google-calendar',
  verify: {
    token: {
      header: 'x-goog-channel-token',
    },
  },
  credentialDescription:
    "The token given when the push channel was opened",
  receive: googleCalendarWebhookReceive,
})

import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { sentryWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'sentry',
  receive: sentryWebhookReceive,
})

import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { googleDriveWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'google-drive',
  verify: {
    token: {
      header: 'x-goog-channel-token',
    },
  },
  credentialDescription:
    "The token given when the push channel was opened",
  receive: googleDriveWebhookReceive,
})

import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { googleDriveWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'google-drive',
  receive: googleDriveWebhookReceive,
})

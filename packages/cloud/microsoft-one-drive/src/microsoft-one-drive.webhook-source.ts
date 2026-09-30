import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { microsoftOneDriveWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'microsoft-one-drive',
  receive: microsoftOneDriveWebhookReceive,
})

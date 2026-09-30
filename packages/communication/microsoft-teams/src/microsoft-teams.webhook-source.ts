import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { microsoftTeamsWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'microsoft-teams',
  receive: microsoftTeamsWebhookReceive,
})

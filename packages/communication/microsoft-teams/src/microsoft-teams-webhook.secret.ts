import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const microsoftTeamsWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Microsoft Teams Webhook Secret',
  description: "The clientState given when the Graph subscription was created",
  secretId: 'MICROSOFT_TEAMS_WEBHOOK_CLIENT_STATE',
  schema: microsoftTeamsWebhookSecretSchema,
})

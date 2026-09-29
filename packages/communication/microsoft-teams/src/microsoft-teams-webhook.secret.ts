import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const microsoftTeamsWebhookSecretSchema = z.string()

defineCredential({
  name: 'microsoftTeamsWebhookSecret',
  displayName: 'Microsoft Teams Webhook Secret',
  description: "The clientState given when the Graph subscription was created",
  type: 'singleton',
  schema: microsoftTeamsWebhookSecretSchema,
})

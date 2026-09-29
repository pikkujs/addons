import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const microsoftOutlookWebhookSecretSchema = z.string()

defineCredential({
  name: 'microsoftOutlookWebhookSecret',
  displayName: 'Microsoft Outlook Webhook Secret',
  description: "The clientState given when the Graph subscription was created",
  type: 'singleton',
  schema: microsoftOutlookWebhookSecretSchema,
})

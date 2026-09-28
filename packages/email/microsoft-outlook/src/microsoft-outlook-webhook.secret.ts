import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const microsoftOutlookWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Microsoft Outlook Webhook Secret',
  description: "The clientState given when the Graph subscription was created",
  secretId: 'MICROSOFT_OUTLOOK_WEBHOOK_CLIENT_STATE',
  schema: microsoftOutlookWebhookSecretSchema,
})

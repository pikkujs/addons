import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const microsoftOneDriveWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Microsoft OneDrive Webhook Secret',
  description: "The clientState given when the Graph subscription was created",
  secretId: 'MICROSOFT_ONE_DRIVE_WEBHOOK_CLIENT_STATE',
  schema: microsoftOneDriveWebhookSecretSchema,
})

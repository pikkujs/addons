import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const googleDriveWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Google Drive Webhook Secret',
  description: "The token given when the push channel was opened",
  secretId: 'GOOGLE_DRIVE_WEBHOOK_CHANNEL_TOKEN',
  schema: googleDriveWebhookSecretSchema,
})

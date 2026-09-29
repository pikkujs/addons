import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const googleDriveWebhookSecretSchema = z.string()

defineCredential({
  name: 'googleDriveWebhookSecret',
  displayName: 'Google Drive Webhook Secret',
  description: "The token given when the push channel was opened",
  type: 'singleton',
  schema: googleDriveWebhookSecretSchema,
})

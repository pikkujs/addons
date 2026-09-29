import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const microsoftOneDriveWebhookSecretSchema = z.string()

defineCredential({
  name: 'microsoftOneDriveWebhookSecret',
  displayName: 'Microsoft OneDrive Webhook Secret',
  description: "The clientState given when the Graph subscription was created",
  type: 'singleton',
  schema: microsoftOneDriveWebhookSecretSchema,
})

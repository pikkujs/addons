import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const nocodbWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'NocoDB Webhook Secret',
  description: "The value of a header added to the NocoDB webhook as X-Webhook-Token",
  secretId: 'NOCODB_WEBHOOK_TOKEN',
  schema: nocodbWebhookSecretSchema,
})

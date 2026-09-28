import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const linearWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Linear Webhook Secret',
  description: "The Linear webhook's signing secret",
  secretId: 'LINEAR_WEBHOOK_SECRET',
  schema: linearWebhookSecretSchema,
})

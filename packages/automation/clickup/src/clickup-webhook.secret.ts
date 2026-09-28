import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const clickupWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'ClickUp Webhook Secret',
  description: "The secret ClickUp returned when the webhook was created",
  secretId: 'CLICKUP_WEBHOOK_SECRET',
  schema: clickupWebhookSecretSchema,
})

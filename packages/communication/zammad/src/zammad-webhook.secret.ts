import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const zammadWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Zammad Webhook Secret',
  description: "The webhook's HMAC signature token",
  secretId: 'ZAMMAD_WEBHOOK_SECRET',
  schema: zammadWebhookSecretSchema,
})

import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const taigaWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Taiga Webhook Secret',
  description: "The webhook's secret key",
  secretId: 'TAIGA_WEBHOOK_KEY',
  schema: taigaWebhookSecretSchema,
})

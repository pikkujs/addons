import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const ghostWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Ghost Webhook Secret',
  description: "The webhook's secret",
  secretId: 'GHOST_WEBHOOK_SECRET',
  schema: ghostWebhookSecretSchema,
})

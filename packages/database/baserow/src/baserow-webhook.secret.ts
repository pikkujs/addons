import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const baserowWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Baserow Webhook Secret',
  description: "The value of a header added to the Baserow webhook as X-Webhook-Token",
  secretId: 'BASEROW_WEBHOOK_TOKEN',
  schema: baserowWebhookSecretSchema,
})

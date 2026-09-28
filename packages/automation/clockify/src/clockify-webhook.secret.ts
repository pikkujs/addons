import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const clockifyWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Clockify Webhook Secret',
  description: "The webhook's signing token, which Clockify sends in Clockify-Signature",
  secretId: 'CLOCKIFY_WEBHOOK_TOKEN',
  schema: clockifyWebhookSecretSchema,
})

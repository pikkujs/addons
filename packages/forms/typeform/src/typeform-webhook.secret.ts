import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const typeformWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Typeform Webhook Secret',
  description: "The secret set on the Typeform webhook",
  secretId: 'TYPEFORM_WEBHOOK_SECRET',
  schema: typeformWebhookSecretSchema,
})

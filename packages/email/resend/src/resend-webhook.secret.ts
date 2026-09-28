import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const resendWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Resend Webhook Secret',
  description: "The webhook's signing secret (whsec_...)",
  secretId: 'RESEND_WEBHOOK_SECRET',
  schema: resendWebhookSecretSchema,
})

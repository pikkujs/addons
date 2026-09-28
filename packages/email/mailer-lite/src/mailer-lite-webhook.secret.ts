import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const mailerLiteWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'MailerLite Webhook Secret',
  description: "The webhook's signing secret",
  secretId: 'MAILER_LITE_WEBHOOK_SECRET',
  schema: mailerLiteWebhookSecretSchema,
})

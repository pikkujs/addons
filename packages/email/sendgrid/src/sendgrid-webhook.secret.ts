import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const sendgridWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'SendGrid Webhook Secret',
  description: "The Event Webhook's verification key, as SendGrid shows it",
  secretId: 'SENDGRID_WEBHOOK_PUBLIC_KEY',
  schema: sendgridWebhookSecretSchema,
})

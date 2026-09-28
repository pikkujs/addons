import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const mailgunWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Mailgun Webhook Secret',
  description: "The account's HTTP webhook signing key",
  secretId: 'MAILGUN_WEBHOOK_SIGNING_KEY',
  schema: mailgunWebhookSecretSchema,
})

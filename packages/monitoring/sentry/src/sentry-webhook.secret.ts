import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const sentryWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Sentry Webhook Secret',
  description: "The integration's client secret",
  secretId: 'SENTRY_WEBHOOK_SECRET',
  schema: sentryWebhookSecretSchema,
})

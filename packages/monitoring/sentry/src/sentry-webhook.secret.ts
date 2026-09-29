import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const sentryWebhookSecretSchema = z.string()

defineCredential({
  name: 'sentryWebhookSecret',
  displayName: 'Sentry Webhook Secret',
  description: "The integration's client secret",
  type: 'singleton',
  schema: sentryWebhookSecretSchema,
})

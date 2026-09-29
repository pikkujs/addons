import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mailerLiteWebhookSecretSchema = z.string()

defineCredential({
  name: 'mailerLiteWebhookSecret',
  displayName: 'MailerLite Webhook Secret',
  description: "The webhook's signing secret",
  type: 'singleton',
  schema: mailerLiteWebhookSecretSchema,
})

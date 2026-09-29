import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mailgunWebhookSecretSchema = z.string()

defineCredential({
  name: 'mailgunWebhookSecret',
  displayName: 'Mailgun Webhook Secret',
  description: "The account's HTTP webhook signing key",
  type: 'singleton',
  schema: mailgunWebhookSecretSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const sendgridWebhookSecretSchema = z.string()

defineCredential({
  name: 'sendgridWebhookSecret',
  displayName: 'SendGrid Webhook Secret',
  description: "The Event Webhook's verification key, as SendGrid shows it",
  type: 'singleton',
  schema: sendgridWebhookSecretSchema,
})

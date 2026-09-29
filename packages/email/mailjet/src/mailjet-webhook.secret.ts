import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mailjetWebhookSecretSchema = z.string()

defineCredential({
  name: 'mailjetWebhookSecret',
  displayName: 'Mailjet Webhook Secret',
  description: "A token of your choosing, added to the event URL as ?token=",
  type: 'singleton',
  schema: mailjetWebhookSecretSchema,
})

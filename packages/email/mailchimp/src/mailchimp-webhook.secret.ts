import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mailchimpWebhookSecretSchema = z.string()

defineCredential({
  name: 'mailchimpWebhookSecret',
  displayName: 'Mailchimp Webhook Secret',
  description: "A token of your choosing, added to the webhook URL as ?token=",
  type: 'singleton',
  schema: mailchimpWebhookSecretSchema,
})

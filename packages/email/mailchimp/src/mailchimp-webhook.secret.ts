import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const mailchimpWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Mailchimp Webhook Secret',
  description: "A token of your choosing, added to the webhook URL as ?token=",
  secretId: 'MAILCHIMP_WEBHOOK_TOKEN',
  schema: mailchimpWebhookSecretSchema,
})

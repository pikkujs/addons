import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const mailjetWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Mailjet Webhook Secret',
  description: "A token of your choosing, added to the event URL as ?token=",
  secretId: 'MAILJET_WEBHOOK_TOKEN',
  schema: mailjetWebhookSecretSchema,
})

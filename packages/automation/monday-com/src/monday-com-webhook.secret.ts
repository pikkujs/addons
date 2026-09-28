import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const mondayComWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'monday.com Webhook Secret',
  description: "A token of your choosing, added to the webhook URL as ?token=",
  secretId: 'MONDAY_COM_WEBHOOK_TOKEN',
  schema: mondayComWebhookSecretSchema,
})

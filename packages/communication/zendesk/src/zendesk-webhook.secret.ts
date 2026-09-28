import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const zendeskWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Zendesk Webhook Secret',
  description: "The webhook's signing secret",
  secretId: 'ZENDESK_WEBHOOK_SECRET',
  schema: zendeskWebhookSecretSchema,
})

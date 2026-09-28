import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const freshdeskWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Freshdesk Webhook Secret',
  description: "A token of your choosing, added to the automation webhook URL as ?token=",
  secretId: 'FRESHDESK_WEBHOOK_TOKEN',
  schema: freshdeskWebhookSecretSchema,
})

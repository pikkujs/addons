import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const jotformWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Jotform Webhook Secret',
  description: "A token of your choosing, added to the webhook URL as ?token=",
  secretId: 'JOTFORM_WEBHOOK_TOKEN',
  schema: jotformWebhookSecretSchema,
})

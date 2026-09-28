import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const asanaWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Asana Webhook Secret',
  description: "The X-Hook-Secret Asana sent in the handshake when the webhook was created",
  secretId: 'ASANA_WEBHOOK_SECRET',
  schema: asanaWebhookSecretSchema,
})

import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const formstackWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Formstack Webhook Secret',
  description: "The webhook's handshake key",
  secretId: 'FORMSTACK_WEBHOOK_HANDSHAKE_KEY',
  schema: formstackWebhookSecretSchema,
})

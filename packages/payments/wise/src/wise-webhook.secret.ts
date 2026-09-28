import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const wiseWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Wise Webhook Secret',
  description: "Wise's webhook signing public key, as PEM",
  secretId: 'WISE_WEBHOOK_PUBLIC_KEY',
  schema: wiseWebhookSecretSchema,
})

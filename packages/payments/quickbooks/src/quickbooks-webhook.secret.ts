import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const quickbooksWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'QuickBooks Webhook Secret',
  description: "The app's webhook verifier token",
  secretId: 'QUICKBOOKS_WEBHOOK_VERIFIER_TOKEN',
  schema: quickbooksWebhookSecretSchema,
})

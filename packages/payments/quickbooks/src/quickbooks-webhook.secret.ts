import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const quickbooksWebhookSecretSchema = z.string()

defineCredential({
  name: 'quickbooksWebhookSecret',
  displayName: 'QuickBooks Webhook Secret',
  description: "The app's webhook verifier token",
  type: 'singleton',
  schema: quickbooksWebhookSecretSchema,
})

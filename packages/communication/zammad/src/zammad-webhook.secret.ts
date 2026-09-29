import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const zammadWebhookSecretSchema = z.string()

defineCredential({
  name: 'zammadWebhookSecret',
  displayName: 'Zammad Webhook Secret',
  description: "The webhook's HMAC signature token",
  type: 'singleton',
  schema: zammadWebhookSecretSchema,
})

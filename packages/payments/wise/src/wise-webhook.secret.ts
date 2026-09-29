import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const wiseWebhookSecretSchema = z.string()

defineCredential({
  name: 'wiseWebhookSecret',
  displayName: 'Wise Webhook Secret',
  description: "Wise's webhook signing public key, as PEM",
  type: 'singleton',
  schema: wiseWebhookSecretSchema,
})

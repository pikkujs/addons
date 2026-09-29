import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const typeformWebhookSecretSchema = z.string()

defineCredential({
  name: 'typeformWebhookSecret',
  displayName: 'Typeform Webhook Secret',
  description: "The secret set on the Typeform webhook",
  type: 'singleton',
  schema: typeformWebhookSecretSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const formstackWebhookSecretSchema = z.string()

defineCredential({
  name: 'formstackWebhookSecret',
  displayName: 'Formstack Webhook Secret',
  description: "The webhook's handshake key",
  type: 'singleton',
  schema: formstackWebhookSecretSchema,
})

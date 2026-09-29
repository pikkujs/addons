import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const clockifyWebhookSecretSchema = z.string()

defineCredential({
  name: 'clockifyWebhookSecret',
  displayName: 'Clockify Webhook Secret',
  description: "The webhook's signing token, which Clockify sends in Clockify-Signature",
  type: 'singleton',
  schema: clockifyWebhookSecretSchema,
})

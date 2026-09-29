import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const baserowWebhookSecretSchema = z.string()

defineCredential({
  name: 'baserowWebhookSecret',
  displayName: 'Baserow Webhook Secret',
  description: "The value of a header added to the Baserow webhook as X-Webhook-Token",
  type: 'singleton',
  schema: baserowWebhookSecretSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const ghostWebhookSecretSchema = z.string()

defineCredential({
  name: 'ghostWebhookSecret',
  displayName: 'Ghost Webhook Secret',
  description: "The webhook's secret",
  type: 'singleton',
  schema: ghostWebhookSecretSchema,
})

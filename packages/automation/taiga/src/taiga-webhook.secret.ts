import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const taigaWebhookSecretSchema = z.string()

defineCredential({
  name: 'taigaWebhookSecret',
  displayName: 'Taiga Webhook Secret',
  description: "The webhook's secret key",
  type: 'singleton',
  schema: taigaWebhookSecretSchema,
})

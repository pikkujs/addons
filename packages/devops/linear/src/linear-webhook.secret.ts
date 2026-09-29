import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const linearWebhookSecretSchema = z.string()

defineCredential({
  name: 'linearWebhookSecret',
  displayName: 'Linear Webhook Secret',
  description: "The Linear webhook's signing secret",
  type: 'singleton',
  schema: linearWebhookSecretSchema,
})

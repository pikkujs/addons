import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const clickupWebhookSecretSchema = z.string()

defineCredential({
  name: 'clickupWebhookSecret',
  displayName: 'ClickUp Webhook Secret',
  description: "The secret ClickUp returned when the webhook was created",
  type: 'singleton',
  schema: clickupWebhookSecretSchema,
})

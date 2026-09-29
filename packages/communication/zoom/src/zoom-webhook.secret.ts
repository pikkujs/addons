import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const zoomWebhookSecretSchema = z.string()

defineCredential({
  name: 'zoomWebhookSecret',
  displayName: 'Zoom Webhook Secret',
  description: "The app's webhook secret token",
  type: 'singleton',
  schema: zoomWebhookSecretSchema,
})

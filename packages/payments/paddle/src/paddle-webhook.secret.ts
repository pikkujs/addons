import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const paddleWebhookSecretSchema = z.string()

defineCredential({
  name: 'paddleWebhookSecret',
  displayName: 'Paddle Webhook Secret',
  description: "The notification destination's secret key",
  type: 'singleton',
  schema: paddleWebhookSecretSchema,
})

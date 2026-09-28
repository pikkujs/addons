import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const paddleWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Paddle Webhook Secret',
  description: "The notification destination's secret key",
  secretId: 'PADDLE_WEBHOOK_SECRET',
  schema: paddleWebhookSecretSchema,
})

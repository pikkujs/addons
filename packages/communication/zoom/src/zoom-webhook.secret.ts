import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const zoomWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Zoom Webhook Secret',
  description: "The app's webhook secret token",
  secretId: 'ZOOM_WEBHOOK_SECRET_TOKEN',
  schema: zoomWebhookSecretSchema,
})

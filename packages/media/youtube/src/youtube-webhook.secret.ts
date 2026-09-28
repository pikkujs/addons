import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const youtubeWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'YouTube Webhook Secret',
  description: "The hub.secret given when subscribing to the channel feed",
  secretId: 'YOUTUBE_WEBHOOK_SECRET',
  schema: youtubeWebhookSecretSchema,
})

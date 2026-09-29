import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const youtubeWebhookSecretSchema = z.string()

defineCredential({
  name: 'youtubeWebhookSecret',
  displayName: 'YouTube Webhook Secret',
  description: "The hub.secret given when subscribing to the channel feed",
  type: 'singleton',
  schema: youtubeWebhookSecretSchema,
})

import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const elevenlabsWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'ElevenLabs Webhook Secret',
  description: "The webhook's HMAC secret",
  secretId: 'ELEVENLABS_WEBHOOK_SECRET',
  schema: elevenlabsWebhookSecretSchema,
})

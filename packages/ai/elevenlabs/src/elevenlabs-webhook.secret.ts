import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const elevenlabsWebhookSecretSchema = z.string()

defineCredential({
  name: 'elevenlabsWebhookSecret',
  displayName: 'ElevenLabs Webhook Secret',
  description: "The webhook's HMAC secret",
  type: 'singleton',
  schema: elevenlabsWebhookSecretSchema,
})

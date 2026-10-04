import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const stravaWebhookSecretSchema = z.string()

defineCredential({
  name: 'stravaWebhookSecret',
  displayName: 'Strava Webhook Secret',
  description: "The verify_token given when the push subscription was created",
  type: 'singleton',
  schema: stravaWebhookSecretSchema,
})

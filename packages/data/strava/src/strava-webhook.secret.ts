import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const stravaWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Strava Webhook Secret',
  description: "The verify_token given when the push subscription was created",
  secretId: 'STRAVA_WEBHOOK_VERIFY_TOKEN',
  schema: stravaWebhookSecretSchema,
})

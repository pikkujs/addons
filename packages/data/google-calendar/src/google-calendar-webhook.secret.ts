import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const googleCalendarWebhookSecretSchema = z.string()

defineCredential({
  name: 'googleCalendarWebhookSecret',
  displayName: 'Google Calendar Webhook Secret',
  description: "The token given when the push channel was opened",
  type: 'singleton',
  schema: googleCalendarWebhookSecretSchema,
})

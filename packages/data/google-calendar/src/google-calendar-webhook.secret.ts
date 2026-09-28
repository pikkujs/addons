import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const googleCalendarWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Google Calendar Webhook Secret',
  description: "The token given when the push channel was opened",
  secretId: 'GOOGLE_CALENDAR_WEBHOOK_CHANNEL_TOKEN',
  schema: googleCalendarWebhookSecretSchema,
})

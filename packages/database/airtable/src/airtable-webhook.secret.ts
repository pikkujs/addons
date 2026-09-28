import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const airtableWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Airtable Webhook Secret',
  description: "The macSecretBase64 Airtable returned when the webhook was created",
  secretId: 'AIRTABLE_WEBHOOK_SECRET',
  schema: airtableWebhookSecretSchema,
})

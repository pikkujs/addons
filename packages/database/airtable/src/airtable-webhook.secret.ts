import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const airtableWebhookSecretSchema = z.string()

defineCredential({
  name: 'airtableWebhookSecret',
  displayName: 'Airtable Webhook Secret',
  description: "The macSecretBase64 Airtable returned when the webhook was created",
  type: 'singleton',
  schema: airtableWebhookSecretSchema,
})

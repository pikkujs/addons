import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'
import { defineVariable } from '@pikku/core/variable'

export const twilioWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Twilio Webhook Secret',
  description: "The account's auth token, which Twilio signs requests with",
  secretId: 'TWILIO_WEBHOOK_AUTH_TOKEN',
  schema: twilioWebhookSecretSchema,
})

export const twilioWebhookUrlSchema = z.string()

defineVariable({
  name: 'twilio_webhook_url',
  displayName: 'Twilio Webhook URL',
  description: "The webhook URL exactly as configured in Twilio, which it signs",
  variableId: 'TWILIO_WEBHOOK_URL',
  schema: twilioWebhookUrlSchema,
})

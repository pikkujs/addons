import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineVariable } from '@pikku/core/variable'

export const twilioWebhookSecretSchema = z.string()

defineCredential({
  name: 'twilioWebhookSecret',
  displayName: 'Twilio Webhook Secret',
  description: "The account's auth token, which Twilio signs requests with",
  type: 'singleton',
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

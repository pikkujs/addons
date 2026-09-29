import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const resendWebhookSecretSchema = z.string()

defineCredential({
  name: 'resendWebhookSecret',
  displayName: 'Resend Webhook Secret',
  description: "The webhook's signing secret (whsec_...)",
  type: 'singleton',
  schema: resendWebhookSecretSchema,
})

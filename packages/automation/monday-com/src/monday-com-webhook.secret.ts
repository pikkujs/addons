import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mondayComWebhookSecretSchema = z.string()

defineCredential({
  name: 'mondayComWebhookSecret',
  displayName: 'monday.com Webhook Secret',
  description: "A token of your choosing, added to the webhook URL as ?token=",
  type: 'singleton',
  schema: mondayComWebhookSecretSchema,
})

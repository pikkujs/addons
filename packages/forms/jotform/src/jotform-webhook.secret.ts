import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const jotformWebhookSecretSchema = z.string()

defineCredential({
  name: 'jotformWebhookSecret',
  displayName: 'Jotform Webhook Secret',
  description: "A token of your choosing, added to the webhook URL as ?token=",
  type: 'singleton',
  schema: jotformWebhookSecretSchema,
})

import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const zendeskWebhookSecretSchema = z.string()

defineCredential({
  name: 'zendeskWebhookSecret',
  displayName: 'Zendesk Webhook Secret',
  description: "The webhook's signing secret",
  type: 'singleton',
  schema: zendeskWebhookSecretSchema,
})

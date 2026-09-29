import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const freshdeskWebhookSecretSchema = z.string()

defineCredential({
  name: 'freshdeskWebhookSecret',
  displayName: 'Freshdesk Webhook Secret',
  description: "A token of your choosing, added to the automation webhook URL as ?token=",
  type: 'singleton',
  schema: freshdeskWebhookSecretSchema,
})

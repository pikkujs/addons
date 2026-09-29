import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const convertkitWebhookSecretSchema = z.string()

defineCredential({
  name: 'convertkitWebhookSecret',
  displayName: 'Kit Webhook Secret',
  description: "A token of your choosing, added to the webhook URL as ?token=",
  type: 'singleton',
  schema: convertkitWebhookSecretSchema,
})

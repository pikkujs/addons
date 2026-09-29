import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const wekanWebhookSecretSchema = z.string()

defineCredential({
  name: 'wekanWebhookSecret',
  displayName: 'Wekan Webhook Secret',
  description: "A token of your choosing, added to the outgoing webhook URL as ?token=",
  type: 'singleton',
  schema: wekanWebhookSecretSchema,
})

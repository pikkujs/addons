import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const onfleetWebhookSecretSchema = z.string()

defineCredential({
  name: 'onfleetWebhookSecret',
  displayName: 'Onfleet Webhook Secret',
  description: "The organization's webhook secret, as hex",
  type: 'singleton',
  schema: onfleetWebhookSecretSchema,
})

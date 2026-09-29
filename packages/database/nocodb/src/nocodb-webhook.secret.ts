import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const nocodbWebhookSecretSchema = z.string()

defineCredential({
  name: 'nocodbWebhookSecret',
  displayName: 'NocoDB Webhook Secret',
  description: "The value of a header added to the NocoDB webhook as X-Webhook-Token",
  type: 'singleton',
  schema: nocodbWebhookSecretSchema,
})

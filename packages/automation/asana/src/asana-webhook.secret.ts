import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const asanaWebhookSecretSchema = z.string()

defineCredential({
  name: 'asanaWebhookSecret',
  displayName: 'Asana Webhook Secret',
  description: "The X-Hook-Secret Asana sent in the handshake when the webhook was created",
  type: 'singleton',
  schema: asanaWebhookSecretSchema,
})

export const asanaWebhookPendingSchema = z.string()

defineCredential({
  name: 'asanaWebhookPending',
  displayName: 'Asana Webhook Handshake Nonce',
  description: 'Set by asanaWebhookCreate while Asana makes its handshake, so only that handshake is accepted',
  type: 'singleton',
  schema: asanaWebhookPendingSchema,
})

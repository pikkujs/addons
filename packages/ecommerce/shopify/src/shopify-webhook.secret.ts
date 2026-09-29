import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const shopifyWebhookSecretSchema = z.string()

defineCredential({
  name: 'shopifyWebhookSecret',
  displayName: 'Shopify Webhook Secret',
  description: "The app's client secret, which Shopify signs webhooks with",
  type: 'singleton',
  schema: shopifyWebhookSecretSchema,
})

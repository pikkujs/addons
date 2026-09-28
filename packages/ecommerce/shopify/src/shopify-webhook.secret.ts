import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const shopifyWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'Shopify Webhook Secret',
  description: "The app's client secret, which Shopify signs webhooks with",
  secretId: 'SHOPIFY_WEBHOOK_SECRET',
  schema: shopifyWebhookSecretSchema,
})

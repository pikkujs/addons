import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const woocommerceWebhookSecretSchema = z.string()

defineSecret({
  name: 'webhook_secret',
  displayName: 'WooCommerce Webhook Secret',
  description: "The secret set on the WooCommerce webhook",
  secretId: 'WOOCOMMERCE_WEBHOOK_SECRET',
  schema: woocommerceWebhookSecretSchema,
})

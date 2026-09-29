import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const woocommerceWebhookSecretSchema = z.string()

defineCredential({
  name: 'woocommerceWebhookSecret',
  displayName: 'WooCommerce Webhook Secret',
  description: "The secret set on the WooCommerce webhook",
  type: 'singleton',
  schema: woocommerceWebhookSecretSchema,
})

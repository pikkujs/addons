import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const woocommerceCredentialSchema = z.object({
  apiKey: z.string().describe('WooCommerce API key'),
})

defineCredential({
  name: 'woocommerce',
  displayName: 'WooCommerce',
  description: 'Consume the WooCommerce REST API (products, orders, customers)',
  type: 'wire',
  schema: woocommerceCredentialSchema,
})

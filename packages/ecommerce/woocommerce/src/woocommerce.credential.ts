import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const woocommerceCredentialSchema = z.object({
  apiKey: z.string().describe('WooCommerce API key'),
})

wireCredential({
  name: 'woocommerce',
  displayName: 'WooCommerce',
  description: 'Consume the WooCommerce REST API (products, orders, customers)',
  type: 'wire',
  schema: woocommerceCredentialSchema,
})

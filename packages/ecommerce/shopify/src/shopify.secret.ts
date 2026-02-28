import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const shopifySecretsSchema = z.object({
  shopDomain: z.string().describe('Store domain (e.g., mystore.myshopify.com)'),
  accessToken: z.string().describe('Admin API access token'),
})

export type ShopifySecrets = z.infer<typeof shopifySecretsSchema>

wireSecret({
  name: 'shopify',
  displayName: 'Shopify API',
  description: 'Shopify Admin API secrets',
  secretId: 'SHOPIFY_CREDENTIALS',
  schema: shopifySecretsSchema,
})

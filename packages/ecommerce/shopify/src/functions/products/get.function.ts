import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyProductSchema } from '../../schemas.js'

export const GetProductInput = z.object({
  productId: z.string().describe('Product ID'),
})

export const GetProductOutput = z.object({
  product: ShopifyProductSchema,
})

type Output = z.infer<typeof GetProductOutput>

export const getProduct = pikkuSessionlessFunc({
  description: 'Get a product by ID',
  node: { displayName: 'Get Product', category: 'Ecommerce', type: 'action' },
  input: GetProductInput,
  output: GetProductOutput,
  func: async ({ shopify }, { productId }) => {
    const result = await shopify.getProduct(productId)
    return { product: result.product }
  },
})

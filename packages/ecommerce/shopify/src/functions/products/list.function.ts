import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyProductSchema } from '../../schemas.js'

export const ListProductsInput = z.object({
  limit: z.number().optional().describe('Maximum number of products to return'),
  sinceId: z.string().optional().describe('Return products after this ID'),
  collectionId: z.string().optional().describe('Filter by collection ID'),
})

export const ListProductsOutput = z.object({
  products: z.array(ShopifyProductSchema),
})

type Output = z.infer<typeof ListProductsOutput>

export const listProducts = pikkuSessionlessFunc({
  description: 'List all products',
  node: { displayName: 'List Products', category: 'Ecommerce', type: 'action' },
  input: ListProductsInput,
  output: ListProductsOutput,
  func: async ({ shopify }, { limit, sinceId, collectionId }) => {
    const result = await shopify.listProducts({
      limit,
      since_id: sinceId,
      collection_id: collectionId,
    })
    return { products: result.products }
  },
})

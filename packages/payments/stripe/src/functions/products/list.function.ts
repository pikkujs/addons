import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ListParamsSchema, ProductSchema, listSchema } from '../../stripe.types.js'
import { toStripeParams, fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const ProductListInput = z.object({
  active: z.boolean().optional().describe('Only return products that are active or inactive'),
  ...ListParamsSchema,
})

export const ProductListOutput = listSchema(ProductSchema)

export const productList = pikkuSessionlessFunc({
  description: 'Returns a list of your products',
  node: { displayName: 'List Products', category: 'Products', type: 'action' },
  input: ProductListInput,
  output: ProductListOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.products.list(toStripeParams(data))
    return ProductListOutput.parse({
      object: result.object,
      hasMore: result.has_more,
      url: result.url,
      data: result.data.map((product) => ({
        ...fromStripeObject(product),
        created: epochToIso(product.created),
        updated: epochToIso(product.updated),
      })),
    })
  },
})

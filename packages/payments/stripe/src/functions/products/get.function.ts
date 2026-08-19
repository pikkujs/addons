import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ProductSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const ProductGetInput = z.object({
  productId: z.string().describe('The identifier of the product to retrieve (prod_...)'),
})

export const ProductGetOutput = ProductSchema

export const productGet = pikkuSessionlessFunc({
  description: 'Retrieve details of an existing product',
  node: { displayName: 'Get Product', category: 'Products', type: 'action' },
  input: ProductGetInput,
  output: ProductGetOutput,
  func: async ({ stripe }, { productId }) => {
    const result = await stripe.products.retrieve(productId)
    const camel = fromStripeObject(result)
    return ProductGetOutput.parse({
      ...camel,
      created: epochToIso(result.created),
      updated: epochToIso(result.updated),
    })
  },
})

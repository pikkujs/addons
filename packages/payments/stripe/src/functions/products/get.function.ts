import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ProductSchema } from '../../stripe.types.js'

export const ProductGetInput = z.object({
  productId: z.string().describe('The identifier of the product to retrieve (prod_...)'),
})

export const ProductGetOutput = ProductSchema

type Output = z.infer<typeof ProductGetOutput>

export const productGet = pikkuSessionlessFunc({
  description: 'Retrieve details of an existing product',
  node: { displayName: 'Get Product', category: 'Products', type: 'action' },
  input: ProductGetInput,
  output: ProductGetOutput,
  func: async ({ stripe }, { productId }) => {
    return await stripe.products.retrieve(productId) as unknown as Output
  },
})

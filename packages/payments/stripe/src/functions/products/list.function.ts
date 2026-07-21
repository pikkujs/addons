import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ListParamsSchema, ProductSchema, listSchema } from '../../stripe.types.js'

export const ProductListInput = z.object({
  active: z.boolean().optional().describe('Only return products that are active or inactive'),
  ...ListParamsSchema,
})

export const ProductListOutput = listSchema(ProductSchema)

type Input = z.infer<typeof ProductListInput>
type Output = z.infer<typeof ProductListOutput>

export const productList = pikkuSessionlessFunc({
  description: 'Returns a list of your products',
  node: { displayName: 'List Products', category: 'Products', type: 'action' },
  input: ProductListInput,
  output: ProductListOutput,
  func: async ({ stripe }, data) => {
    return await stripe.products.list(data as Input) as unknown as Output
  },
})

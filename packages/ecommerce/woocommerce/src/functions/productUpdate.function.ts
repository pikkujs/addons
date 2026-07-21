import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProductUpdateInput = z.object({
  productId: z.string(),
  name: z.string().optional(),
  regular_price: z.string().optional(),
})

export const ProductUpdateOutput = z.object({
  id: z.number().optional(),
})

export const productUpdate = pikkuSessionlessFunc({
  description: "Update a product",
  input: ProductUpdateInput,
  output: ProductUpdateOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("PUT", "/products/{productId}", data) as any
  },
})

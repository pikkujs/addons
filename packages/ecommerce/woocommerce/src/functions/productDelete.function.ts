import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProductDeleteInput = z.object({
  productId: z.string(),
})

export const ProductDeleteOutput = z.object({
  id: z.number().optional(),
})

export const productDelete = pikkuSessionlessFunc({
  description: "Delete a product",
  input: ProductDeleteInput,
  output: ProductDeleteOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("DELETE", "/products/{productId}", data) as any
  },
})

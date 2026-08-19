import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProductGetInput = z.object({
  productId: z.string(),
})

export const ProductGetOutput = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
})

export const productGet = pikkuSessionlessFunc({
  description: "Get a product",
  input: ProductGetInput,
  output: ProductGetOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("GET", "/products/{productId}", data) as any
  },
})

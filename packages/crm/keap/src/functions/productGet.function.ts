import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProductGetInput = z.object({
  productId: z.string(),
})

export const ProductGetOutput = z.record(z.string(), z.unknown())

export const productGet = pikkuSessionlessFunc({
  description: "Get a product",
  input: ProductGetInput,
  output: ProductGetOutput,
  func: async ({ keap }, data) => {
    return keap.call("GET", "/products/{productId}", data) as any
  },
})

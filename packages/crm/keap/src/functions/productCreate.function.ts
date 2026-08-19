import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProductCreateInput = z.object({
  product_name: z.string().optional(),
  product_desc: z.string().optional(),
})

export const ProductCreateOutput = z.record(z.string(), z.unknown())

export const productCreate = pikkuSessionlessFunc({
  description: "Create a product",
  input: ProductCreateInput,
  output: ProductCreateOutput,
  func: async ({ keap }, data) => {
    return keap.call("POST", "/products", data) as any
  },
})

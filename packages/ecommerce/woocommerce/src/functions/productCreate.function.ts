import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ProductCreateInput = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  description: z.string().optional(),
  regular_price: z.string().optional(),
})

export const ProductCreateOutput = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
})

export const productCreate = pikkuSessionlessFunc({
  description: "Create a product",
  input: ProductCreateInput,
  output: ProductCreateOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("POST", "/products", data) as any
  },
})

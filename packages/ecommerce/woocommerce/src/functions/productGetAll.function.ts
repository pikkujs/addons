import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProductGetAllInput = z.object({
  per_page: z.number().optional(),
  page: z.number().optional(),
})

export const ProductGetAllOutput = z.array(z.record(z.string(), z.unknown()))

export const productGetAll = pikkuSessionlessFunc({
  description: "Get many products",
  input: ProductGetAllInput,
  output: ProductGetAllOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("GET", "/products", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ProductGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const ProductGetAllOutput = z.record(z.string(), z.unknown())

export const productGetAll = pikkuSessionlessFunc({
  description: "List products",
  input: ProductGetAllInput,
  output: ProductGetAllOutput,
  func: async ({ keap }, data) => {
    return keap.call("GET", "/products", data) as any
  },
})

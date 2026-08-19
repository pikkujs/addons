import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrderGetAllInput = z.object({
  per_page: z.number().optional(),
  page: z.number().optional(),
})

export const OrderGetAllOutput = z.array(z.record(z.string(), z.unknown()))

export const orderGetAll = pikkuSessionlessFunc({
  description: "Get many orders",
  input: OrderGetAllInput,
  output: OrderGetAllOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("GET", "/orders", data) as any
  },
})

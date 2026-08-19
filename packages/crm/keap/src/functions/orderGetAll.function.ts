import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrderGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const OrderGetAllOutput = z.record(z.string(), z.unknown())

export const orderGetAll = pikkuSessionlessFunc({
  description: "List orders",
  input: OrderGetAllInput,
  output: OrderGetAllOutput,
  func: async ({ keap }, data) => {
    return keap.call("GET", "/orders", data) as any
  },
})

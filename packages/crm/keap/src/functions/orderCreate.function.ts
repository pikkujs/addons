import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrderCreateInput = z.object({
  contact_id: z.number().int().optional(),
  order_date: z.string().optional(),
  order_title: z.string().optional(),
  order_type: z.string().optional(),
})

export const OrderCreateOutput = z.record(z.string(), z.unknown())

export const orderCreate = pikkuSessionlessFunc({
  description: "Create an order",
  input: OrderCreateInput,
  output: OrderCreateOutput,
  func: async ({ keap }, data) => {
    return keap.call("POST", "/orders", data) as any
  },
})

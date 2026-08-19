import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrderCreateInput = z.object({
  status: z.string().optional(),
  currency: z.string().optional(),
  customer_id: z.number().optional(),
})

export const OrderCreateOutput = z.object({
  id: z.number().optional(),
})

export const orderCreate = pikkuSessionlessFunc({
  description: "Create an order",
  input: OrderCreateInput,
  output: OrderCreateOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("POST", "/orders", data) as any
  },
})

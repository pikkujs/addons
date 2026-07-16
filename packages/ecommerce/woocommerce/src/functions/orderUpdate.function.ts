import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrderUpdateInput = z.object({
  orderId: z.string(),
  status: z.string().optional(),
})

export const OrderUpdateOutput = z.object({
  id: z.number().optional(),
})

export const orderUpdate = pikkuSessionlessFunc({
  description: "Update an order",
  input: OrderUpdateInput,
  output: OrderUpdateOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("PUT", "/orders/{orderId}", data) as any
  },
})

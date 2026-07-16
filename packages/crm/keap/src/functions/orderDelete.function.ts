import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrderDeleteInput = z.object({
  orderId: z.string(),
})

export const OrderDeleteOutput = z.record(z.string(), z.unknown())

export const orderDelete = pikkuSessionlessFunc({
  description: "Delete an order",
  input: OrderDeleteInput,
  output: OrderDeleteOutput,
  func: async ({ keap }, data) => {
    return keap.call("DELETE", "/orders/{orderId}", data) as any
  },
})

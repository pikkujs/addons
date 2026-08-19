import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrderDeleteInput = z.object({
  orderId: z.string(),
})

export const OrderDeleteOutput = z.object({
  id: z.number().optional(),
})

export const orderDelete = pikkuSessionlessFunc({
  description: "Delete an order",
  input: OrderDeleteInput,
  output: OrderDeleteOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("DELETE", "/orders/{orderId}", data) as any
  },
})

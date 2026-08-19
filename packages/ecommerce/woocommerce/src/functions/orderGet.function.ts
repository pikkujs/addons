import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrderGetInput = z.object({
  orderId: z.string(),
})

export const OrderGetOutput = z.object({
  id: z.number().optional(),
})

export const orderGet = pikkuSessionlessFunc({
  description: "Get an order",
  input: OrderGetInput,
  output: OrderGetOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("GET", "/orders/{orderId}", data) as any
  },
})

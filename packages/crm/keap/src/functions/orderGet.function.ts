import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrderGetInput = z.object({
  orderId: z.string(),
})

export const OrderGetOutput = z.record(z.string(), z.unknown())

export const orderGet = pikkuSessionlessFunc({
  description: "Get an order",
  input: OrderGetInput,
  output: OrderGetOutput,
  func: async ({ keap }, data) => {
    return keap.call("GET", "/orders/{orderId}", data) as any
  },
})

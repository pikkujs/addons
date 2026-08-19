import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomerGetInput = z.object({
  customerId: z.string(),
})

export const CustomerGetOutput = z.object({
  id: z.number().optional(),
  email: z.string().optional(),
})

export const customerGet = pikkuSessionlessFunc({
  description: "Get a customer",
  input: CustomerGetInput,
  output: CustomerGetOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("GET", "/customers/{customerId}", data) as any
  },
})

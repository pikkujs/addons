import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomerDeleteInput = z.object({
  customerId: z.string(),
})

export const CustomerDeleteOutput = z.object({
  id: z.number().optional(),
})

export const customerDelete = pikkuSessionlessFunc({
  description: "Delete a customer",
  input: CustomerDeleteInput,
  output: CustomerDeleteOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("DELETE", "/customers/{customerId}", data) as any
  },
})

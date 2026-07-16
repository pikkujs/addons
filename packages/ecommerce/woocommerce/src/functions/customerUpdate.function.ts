import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomerUpdateInput = z.object({
  customerId: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
})

export const CustomerUpdateOutput = z.object({
  id: z.number().optional(),
})

export const customerUpdate = pikkuSessionlessFunc({
  description: "Update a customer",
  input: CustomerUpdateInput,
  output: CustomerUpdateOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("PUT", "/customers/{customerId}", data) as any
  },
})

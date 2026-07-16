import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomerCreateInput = z.object({
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().optional(),
})

export const CustomerCreateOutput = z.object({
  id: z.number().optional(),
  email: z.string().optional(),
})

export const customerCreate = pikkuSessionlessFunc({
  description: "Create a customer",
  input: CustomerCreateInput,
  output: CustomerCreateOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("POST", "/customers", data) as any
  },
})

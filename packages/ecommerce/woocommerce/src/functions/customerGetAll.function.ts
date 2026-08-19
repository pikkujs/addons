import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomerGetAllInput = z.object({
  per_page: z.number().optional(),
  page: z.number().optional(),
})

export const CustomerGetAllOutput = z.array(z.record(z.string(), z.unknown()))

export const customerGetAll = pikkuSessionlessFunc({
  description: "Get many customers",
  input: CustomerGetAllInput,
  output: CustomerGetAllOutput,
  func: async ({ woocommerce }, data) => {
    return woocommerce.call("GET", "/customers", data) as any
  },
})

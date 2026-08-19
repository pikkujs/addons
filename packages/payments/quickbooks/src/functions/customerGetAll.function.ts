import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomerGetAllInput = z.object({
  companyId: z.string(),
  query: z.string().optional(),
})

export const CustomerGetAllOutput = z.record(z.string(), z.unknown())

export const customerGetAll = pikkuSessionlessFunc({
  description: "Customer get all",
  input: CustomerGetAllInput,
  output: CustomerGetAllOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/customer", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomerGetInput = z.object({
  companyId: z.string(),
  id: z.string(),
})

export const CustomerGetOutput = z.record(z.string(), z.unknown())

export const customerGet = pikkuSessionlessFunc({
  description: "Customer get",
  input: CustomerGetInput,
  output: CustomerGetOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/customer/{id}", data) as any
  },
})

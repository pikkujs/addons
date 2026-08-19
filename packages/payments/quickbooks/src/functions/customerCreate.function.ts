import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomerCreateInput = z.object({
  companyId: z.string(),
  DisplayName: z.string().optional(),
})

export const CustomerCreateOutput = z.record(z.string(), z.unknown())

export const customerCreate = pikkuSessionlessFunc({
  description: "Customer create",
  input: CustomerCreateInput,
  output: CustomerCreateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/customer", data) as any
  },
})

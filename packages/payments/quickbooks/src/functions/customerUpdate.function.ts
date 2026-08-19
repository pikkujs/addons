import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CustomerUpdateInput = z.object({
  companyId: z.string(),
  Id: z.string().optional(),
  SyncToken: z.string().optional(),
  DisplayName: z.string().optional(),
})

export const CustomerUpdateOutput = z.record(z.string(), z.unknown())

export const customerUpdate = pikkuSessionlessFunc({
  description: "Customer update",
  input: CustomerUpdateInput,
  output: CustomerUpdateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/customer/update", data) as any
  },
})

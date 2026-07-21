import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BillUpdateInput = z.object({
  companyId: z.string(),
  Id: z.string().optional(),
  SyncToken: z.string().optional(),
  VendorRef: z.string().optional(),
})

export const BillUpdateOutput = z.record(z.string(), z.unknown())

export const billUpdate = pikkuSessionlessFunc({
  description: "Bill update",
  input: BillUpdateInput,
  output: BillUpdateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/bill/update", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BillCreateInput = z.object({
  companyId: z.string(),
  VendorRef: z.string().optional(),
})

export const BillCreateOutput = z.record(z.string(), z.unknown())

export const billCreate = pikkuSessionlessFunc({
  description: "Bill create",
  input: BillCreateInput,
  output: BillCreateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/bill", data) as any
  },
})

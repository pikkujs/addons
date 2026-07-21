import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BillGetAllInput = z.object({
  companyId: z.string(),
  query: z.string().optional(),
})

export const BillGetAllOutput = z.record(z.string(), z.unknown())

export const billGetAll = pikkuSessionlessFunc({
  description: "Bill get all",
  input: BillGetAllInput,
  output: BillGetAllOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/bill", data) as any
  },
})

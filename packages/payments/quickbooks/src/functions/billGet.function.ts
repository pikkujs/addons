import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BillGetInput = z.object({
  companyId: z.string(),
  id: z.string(),
})

export const BillGetOutput = z.record(z.string(), z.unknown())

export const billGet = pikkuSessionlessFunc({
  description: "Bill get",
  input: BillGetInput,
  output: BillGetOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/bill/{id}", data) as any
  },
})

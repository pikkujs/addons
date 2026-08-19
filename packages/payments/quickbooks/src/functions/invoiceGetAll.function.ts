import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InvoiceGetAllInput = z.object({
  companyId: z.string(),
  query: z.string().optional(),
})

export const InvoiceGetAllOutput = z.record(z.string(), z.unknown())

export const invoiceGetAll = pikkuSessionlessFunc({
  description: "Invoice get all",
  input: InvoiceGetAllInput,
  output: InvoiceGetAllOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/invoice", data) as any
  },
})

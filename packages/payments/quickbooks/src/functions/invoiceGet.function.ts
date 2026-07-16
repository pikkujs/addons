import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InvoiceGetInput = z.object({
  companyId: z.string(),
  id: z.string(),
})

export const InvoiceGetOutput = z.record(z.string(), z.unknown())

export const invoiceGet = pikkuSessionlessFunc({
  description: "Invoice get",
  input: InvoiceGetInput,
  output: InvoiceGetOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/invoice/{id}", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InvoiceCreateInput = z.object({
  companyId: z.string(),
  CustomerRef: z.string().optional(),
})

export const InvoiceCreateOutput = z.record(z.string(), z.unknown())

export const invoiceCreate = pikkuSessionlessFunc({
  description: "Invoice create",
  input: InvoiceCreateInput,
  output: InvoiceCreateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/invoice", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InvoiceUpdateInput = z.object({
  companyId: z.string(),
  Id: z.string().optional(),
  SyncToken: z.string().optional(),
  CustomerRef: z.string().optional(),
})

export const InvoiceUpdateOutput = z.record(z.string(), z.unknown())

export const invoiceUpdate = pikkuSessionlessFunc({
  description: "Invoice update",
  input: InvoiceUpdateInput,
  output: InvoiceUpdateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/invoice/update", data) as any
  },
})

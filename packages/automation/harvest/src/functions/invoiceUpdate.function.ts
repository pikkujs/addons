import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InvoiceUpdateInput = z.object({
  id: z.string(),
  subject: z.string().optional(),
})

export const InvoiceUpdateOutput = z.record(z.string(), z.unknown())

export const invoiceUpdate = pikkuSessionlessFunc({
  description: "Invoice update",
  input: InvoiceUpdateInput,
  output: InvoiceUpdateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("PATCH", "/invoices/{id}", data) as any
  },
})

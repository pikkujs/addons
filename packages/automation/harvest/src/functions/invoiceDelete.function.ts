import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InvoiceDeleteInput = z.object({
  id: z.string(),
})

export const InvoiceDeleteOutput = z.record(z.string(), z.unknown())

export const invoiceDelete = pikkuSessionlessFunc({
  description: "Invoice delete",
  input: InvoiceDeleteInput,
  output: InvoiceDeleteOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("DELETE", "/invoices/{id}", data) as any
  },
})

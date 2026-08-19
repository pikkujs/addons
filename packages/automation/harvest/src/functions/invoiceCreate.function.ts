import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const InvoiceCreateInput = z.object({
  client_id: z.string().optional(),
})

export const InvoiceCreateOutput = z.record(z.string(), z.unknown())

export const invoiceCreate = pikkuSessionlessFunc({
  description: "Invoice create",
  input: InvoiceCreateInput,
  output: InvoiceCreateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("POST", "/invoices", data) as any
  },
})

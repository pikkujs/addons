import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InvoiceGetInput = z.object({
  id: z.string(),
})

export const InvoiceGetOutput = z.record(z.string(), z.unknown())

export const invoiceGet = pikkuSessionlessFunc({
  description: "Invoice get",
  input: InvoiceGetInput,
  output: InvoiceGetOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("GET", "/invoices/{id}", data) as any
  },
})

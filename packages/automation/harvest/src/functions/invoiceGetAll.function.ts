import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const InvoiceGetAllOutput = z.record(z.string(), z.unknown())

export const invoiceGetAll = pikkuSessionlessFunc({
  description: "Invoice get all",
  output: InvoiceGetAllOutput,
  func: async ({ harvest }) => {
    return harvest.call("GET", "/invoices") as any
  },
})

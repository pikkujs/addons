import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InvoiceSchema } from '../../stripe.types.js'

export const InvoiceVoidInput = z.object({
  invoiceId: z.string().describe('The identifier of the finalized invoice to void (in_...)'),
})

export const InvoiceVoidOutput = InvoiceSchema

type Output = z.infer<typeof InvoiceVoidOutput>

export const invoiceVoid = pikkuSessionlessFunc({
  description: 'Void a finalized invoice, marking it uncollectible without deleting it. Use instead of delete for issued invoices',
  node: { displayName: 'Void Invoice', category: 'Invoices', type: 'action' },
  input: InvoiceVoidInput,
  output: InvoiceVoidOutput,
  func: async ({ stripe }, { invoiceId }) => {
    return await stripe.invoices.voidInvoice(invoiceId) as unknown as Output
  },
})

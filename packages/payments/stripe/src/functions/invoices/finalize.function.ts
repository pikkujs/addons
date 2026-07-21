import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InvoiceSchema } from '../../stripe.types.js'

export const InvoiceFinalizeInput = z.object({
  invoiceId: z.string().describe('The identifier of the draft invoice to finalize (in_...)'),
  auto_advance: z.boolean().optional().describe('Whether Stripe automatically collects the invoice after finalizing'),
})

export const InvoiceFinalizeOutput = InvoiceSchema

type Output = z.infer<typeof InvoiceFinalizeOutput>

export const invoiceFinalize = pikkuSessionlessFunc({
  description: 'Finalize a draft invoice, turning it into an issued invoice with a number, hosted URL and PDF',
  node: { displayName: 'Finalize Invoice', category: 'Invoices', type: 'action' },
  input: InvoiceFinalizeInput,
  output: InvoiceFinalizeOutput,
  func: async ({ stripe }, { invoiceId, auto_advance }) => {
    return await stripe.invoices.finalizeInvoice(
      invoiceId,
      auto_advance !== undefined ? { auto_advance } : undefined,
    ) as unknown as Output
  },
})

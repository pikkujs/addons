import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InvoiceSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const InvoiceFinalizeInput = z.object({
  invoiceId: z.string().describe('The identifier of the draft invoice to finalize (in_...)'),
  autoAdvance: z.boolean().optional().describe('Whether Stripe automatically collects the invoice after finalizing'),
})

export const InvoiceFinalizeOutput = InvoiceSchema

export const invoiceFinalize = pikkuSessionlessFunc({
  description: 'Finalize a draft invoice, turning it into an issued invoice with a number, hosted URL and PDF',
  node: { displayName: 'Finalize Invoice', category: 'Invoices', type: 'action' },
  input: InvoiceFinalizeInput,
  output: InvoiceFinalizeOutput,
  func: async ({ stripe }, { invoiceId, autoAdvance }) => {
    const result = await stripe.invoices.finalizeInvoice(
      invoiceId,
      autoAdvance !== undefined ? { auto_advance: autoAdvance } : undefined,
    )
    const camel = fromStripeObject(result)
    return InvoiceFinalizeOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})

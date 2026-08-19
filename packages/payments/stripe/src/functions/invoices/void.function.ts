import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { InvoiceSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const InvoiceVoidInput = z.object({
  invoiceId: z.string().describe('The identifier of the finalized invoice to void (in_...)'),
})

export const InvoiceVoidOutput = InvoiceSchema

export const invoiceVoid = pikkuSessionlessFunc({
  description: 'Void a finalized invoice, marking it uncollectible without deleting it. Use instead of delete for issued invoices',
  node: { displayName: 'Void Invoice', category: 'Invoices', type: 'action' },
  input: InvoiceVoidInput,
  output: InvoiceVoidOutput,
  func: async ({ stripe }, { invoiceId }) => {
    const result = await stripe.invoices.voidInvoice(invoiceId)
    const camel = fromStripeObject(result)
    return InvoiceVoidOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InvoiceSchema } from '../../stripe.types.js'

export const InvoiceSendInput = z.object({
  invoiceId: z.string().describe('The identifier of the invoice to send (in_...)'),
})

export const InvoiceSendOutput = InvoiceSchema

type Output = z.infer<typeof InvoiceSendOutput>

export const invoiceSend = pikkuSessionlessFunc({
  description: 'Email an invoice to the customer, containing a link to pay it',
  node: { displayName: 'Send Invoice', category: 'Invoices', type: 'action' },
  input: InvoiceSendInput,
  output: InvoiceSendOutput,
  func: async ({ stripe }, { invoiceId }) => {
    return await stripe.invoices.sendInvoice(invoiceId) as unknown as Output
  },
})

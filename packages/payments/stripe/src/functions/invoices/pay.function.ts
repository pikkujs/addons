import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InvoiceSchema } from '../../stripe.types.js'

export const InvoicePayInput = z.object({
  invoiceId: z.string().describe('The identifier of the invoice to pay (in_...)'),
  payment_method: z.string().optional().describe('A specific payment method to pay with. Defaults to the customer\'s default payment method'),
  off_session: z.boolean().optional().describe('Set true when paying without the customer present'),
})

export const InvoicePayOutput = InvoiceSchema

type Output = z.infer<typeof InvoicePayOutput>

export const invoicePay = pikkuSessionlessFunc({
  description: 'Attempt to pay an open invoice immediately using a saved payment method',
  node: { displayName: 'Pay Invoice', category: 'Invoices', type: 'action' },
  input: InvoicePayInput,
  output: InvoicePayOutput,
  func: async ({ stripe }, { invoiceId, ...data }) => {
    return await stripe.invoices.pay(invoiceId, {
      ...(data.payment_method ? { payment_method: data.payment_method } : {}),
      ...(data.off_session !== undefined ? { off_session: data.off_session } : {}),
    }) as unknown as Output
  },
})

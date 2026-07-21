import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InvoiceSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const InvoicePayInput = z.object({
  invoiceId: z.string().describe('The identifier of the invoice to pay (in_...)'),
  paymentMethod: z.string().optional().describe('A specific payment method to pay with. Defaults to the customer\'s default payment method'),
  offSession: z.boolean().optional().describe('Set true when paying without the customer present'),
})

export const InvoicePayOutput = InvoiceSchema

export const invoicePay = pikkuSessionlessFunc({
  description: 'Attempt to pay an open invoice immediately using a saved payment method',
  node: { displayName: 'Pay Invoice', category: 'Invoices', type: 'action' },
  input: InvoicePayInput,
  output: InvoicePayOutput,
  func: async ({ stripe }, { invoiceId, ...data }) => {
    const result = await stripe.invoices.pay(invoiceId, {
      ...(data.paymentMethod ? { payment_method: data.paymentMethod } : {}),
      ...(data.offSession !== undefined ? { off_session: data.offSession } : {}),
    })
    const camel = fromStripeObject(result)
    return InvoicePayOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})

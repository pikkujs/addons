import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InvoiceSchema, MetadataSchema } from '../../stripe.types.js'

export const InvoiceCreateInput = z.object({
  customer: z.string().describe('The customer to invoice (cus_...)'),
  collection_method: z.enum(['charge_automatically', 'send_invoice']).optional().describe('charge_automatically to charge the saved payment method, or send_invoice to email a payable invoice. Defaults to charge_automatically'),
  auto_advance: z.boolean().optional().describe('Whether Stripe automatically finalizes and collects the invoice. Set false to keep it as an editable draft'),
  days_until_due: z.number().optional().describe('Number of days until the invoice is due. Only valid with collection_method=send_invoice'),
  description: z.string().optional().describe('An arbitrary string attached to the invoice, shown to the customer'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the invoice'),
})

export const InvoiceCreateOutput = InvoiceSchema

type Output = z.infer<typeof InvoiceCreateOutput>

export const invoiceCreate = pikkuSessionlessFunc({
  description: 'Create a draft invoice for a customer. Add invoice items first, then finalize to issue it',
  node: { displayName: 'Create Invoice', category: 'Invoices', type: 'action' },
  input: InvoiceCreateInput,
  output: InvoiceCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.invoices.create({
      customer: data.customer,
      ...(data.collection_method ? { collection_method: data.collection_method } : {}),
      ...(data.auto_advance !== undefined ? { auto_advance: data.auto_advance } : {}),
      ...(data.days_until_due !== undefined ? { days_until_due: data.days_until_due } : {}),
      ...(data.description ? { description: data.description } : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    }) as unknown as Output
  },
})

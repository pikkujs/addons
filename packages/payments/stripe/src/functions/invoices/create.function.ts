import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InvoiceSchema, MetadataSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const InvoiceCreateInput = z.object({
  customer: z.string().describe('The customer to invoice (cus_...)'),
  collectionMethod: z.enum(['charge_automatically', 'send_invoice']).optional().describe('charge_automatically to charge the saved payment method, or send_invoice to email a payable invoice. Defaults to charge_automatically'),
  autoAdvance: z.boolean().optional().describe('Whether Stripe automatically finalizes and collects the invoice. Set false to keep it as an editable draft'),
  daysUntilDue: z.number().optional().describe('Number of days until the invoice is due. Only valid with collectionMethod=send_invoice'),
  description: z.string().optional().describe('An arbitrary string attached to the invoice, shown to the customer'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the invoice'),
})

export const InvoiceCreateOutput = InvoiceSchema

export const invoiceCreate = pikkuSessionlessFunc({
  description: 'Create a draft invoice for a customer. Add invoice items first, then finalize to issue it',
  node: { displayName: 'Create Invoice', category: 'Invoices', type: 'action' },
  input: InvoiceCreateInput,
  output: InvoiceCreateOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.invoices.create({
      customer: data.customer,
      ...(data.collectionMethod ? { collection_method: data.collectionMethod } : {}),
      ...(data.autoAdvance !== undefined ? { auto_advance: data.autoAdvance } : {}),
      ...(data.daysUntilDue !== undefined ? { days_until_due: data.daysUntilDue } : {}),
      ...(data.description ? { description: data.description } : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    })
    const camel = fromStripeObject(result)
    return InvoiceCreateOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})

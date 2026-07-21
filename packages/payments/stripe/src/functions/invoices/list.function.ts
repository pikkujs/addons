import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InvoiceSchema, ListParamsSchema, listSchema } from '../../stripe.types.js'
import { toStripeParams, fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const InvoiceListInput = z.object({
  customer: z.string().optional().describe('Only return invoices for the customer specified by this customer ID'),
  status: z.enum(['draft', 'open', 'paid', 'uncollectible', 'void']).optional().describe('Only return invoices with the given status'),
  subscription: z.string().optional().describe('Only return invoices for the subscription specified by this ID'),
  ...ListParamsSchema,
})

export const InvoiceListOutput = listSchema(InvoiceSchema)

export const invoiceList = pikkuSessionlessFunc({
  description: 'Returns a list of invoices, optionally filtered by customer, subscription or status',
  node: { displayName: 'List Invoices', category: 'Invoices', type: 'action' },
  input: InvoiceListInput,
  output: InvoiceListOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.invoices.list(toStripeParams(data))
    return InvoiceListOutput.parse({
      object: result.object,
      hasMore: result.has_more,
      url: result.url,
      data: result.data.map((invoice) => ({
        ...fromStripeObject(invoice),
        created: epochToIso(invoice.created),
      })),
    })
  },
})

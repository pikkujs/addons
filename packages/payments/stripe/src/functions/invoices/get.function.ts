import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InvoiceSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const InvoiceGetInput = z.object({
  invoiceId: z.string().describe('The identifier of the invoice to retrieve (in_...)'),
})

export const InvoiceGetOutput = InvoiceSchema

export const invoiceGet = pikkuSessionlessFunc({
  description: 'Retrieve details of an invoice, including its hosted URL and PDF link once finalized',
  node: { displayName: 'Get Invoice', category: 'Invoices', type: 'action' },
  input: InvoiceGetInput,
  output: InvoiceGetOutput,
  func: async ({ stripe }, { invoiceId }) => {
    const result = await stripe.invoices.retrieve(invoiceId)
    const camel = fromStripeObject(result)
    return InvoiceGetOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})

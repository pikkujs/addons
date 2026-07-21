import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InvoiceSchema } from '../../stripe.types.js'

export const InvoiceGetInput = z.object({
  invoiceId: z.string().describe('The identifier of the invoice to retrieve (in_...)'),
})

export const InvoiceGetOutput = InvoiceSchema

type Output = z.infer<typeof InvoiceGetOutput>

export const invoiceGet = pikkuSessionlessFunc({
  description: 'Retrieve details of an invoice, including its hosted URL and PDF link once finalized',
  node: { displayName: 'Get Invoice', category: 'Invoices', type: 'action' },
  input: InvoiceGetInput,
  output: InvoiceGetOutput,
  func: async ({ stripe }, { invoiceId }) => {
    return await stripe.invoices.retrieve(invoiceId) as unknown as Output
  },
})

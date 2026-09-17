import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateInvoiceInput = z.object({
  stripeInvoiceId: z.string(),
  description: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
})

export const UpdateInvoiceOutput = z.object({
  invoiceId: z.string(),
  status: z.string(),
})

type StripeInvoice = { id: string; status?: string }

/**
 * Update fields Stripe owns on an invoice (description, metadata). Only draft or
 * open invoices accept these; a paid invoice rejects the change.
 */
export const updateInvoice = pikkuSessionlessFunc({
  description: 'Update a Stripe invoice’s description/metadata',
  node: { displayName: 'Update Invoice', category: 'Checkout', type: 'action' },
  input: UpdateInvoiceInput,
  output: UpdateInvoiceOutput,
  tags: ['addon'],
  func: async ({ stripeApiFor, paymentOwner }, { stripeInvoiceId, description, metadata }, { session }) => {
    const owner = await paymentOwner.resolve(session)
    const stripeApi = stripeApiFor(owner?.stripeAccount)
    const invoice = await stripeApi.post<StripeInvoice>(`/invoices/${stripeInvoiceId}`, {
      ...(description === undefined ? {} : { description }),
      ...(metadata ? { metadata } : {}),
    })
    return { invoiceId: invoice.id, status: invoice.status ?? 'unknown' }
  },
})

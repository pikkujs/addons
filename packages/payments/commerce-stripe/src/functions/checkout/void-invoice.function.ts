import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const VoidInvoiceInput = z.object({
  stripeInvoiceId: z.string(),
})

export const VoidInvoiceOutput = z.object({
  invoiceId: z.string(),
  status: z.string(),
})

type StripeInvoice = { id: string; status?: string }

/**
 * Voids a Stripe invoice, so an order the shop has cancelled stops collecting
 * payment and the invoice can no longer be paid.
 */
export const voidInvoice = pikkuSessionlessFunc({
  description: 'Void a Stripe invoice',
  node: { displayName: 'Void Invoice', category: 'Checkout', type: 'action' },
  input: VoidInvoiceInput,
  output: VoidInvoiceOutput,
  tags: ['addon'],
  func: async ({ stripeApiFor, paymentOwner }, { stripeInvoiceId }, { session }) => {
    const owner = await paymentOwner.resolve(session)
    const stripeApi = stripeApiFor(owner?.stripeAccount)
    const invoice = await stripeApi.post<StripeInvoice>(`/invoices/${stripeInvoiceId}/void`)
    return { invoiceId: invoice.id, status: invoice.status ?? 'unknown' }
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AttachPaymentToInvoiceInput = z.object({
  stripeInvoiceId: z.string(),
  paymentIntentId: z.string(),
})

export const AttachPaymentToInvoiceOutput = z.object({
  invoiceId: z.string(),
  status: z.string(),
})

type StripeInvoice = { id: string; status?: string }

/**
 * Attaches a PaymentIntent (e.g. a bank-transfer one) to a Stripe invoice, so
 * Stripe applies the funds and advances the invoice to partially paid / paid.
 */
export const attachPaymentToInvoice = pikkuSessionlessFunc({
  description: 'Attach a PaymentIntent to a Stripe invoice',
  node: { displayName: 'Attach Payment To Invoice', category: 'Checkout', type: 'action' },
  input: AttachPaymentToInvoiceInput,
  output: AttachPaymentToInvoiceOutput,
  tags: ['addon'],
  func: async ({ stripeApiFor, paymentOwner }, { stripeInvoiceId, paymentIntentId }, { session }) => {
    const owner = await paymentOwner.resolve(session)
    const stripeApi = stripeApiFor(owner?.stripeAccount)
    const invoice = await stripeApi.post<StripeInvoice>(
      `/invoices/${stripeInvoiceId}/attach_payment`,
      { payment_intent: paymentIntentId }
    )
    return { invoiceId: invoice.id, status: invoice.status ?? 'unknown' }
  },
})

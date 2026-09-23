import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { getOwnedStripeResource } from '../../lib/owned-resource.js'

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
  func: async ({ stripeApiFor, kysely, paymentOwner }, { stripeInvoiceId, paymentIntentId }, { session }) => {
    const owner = await paymentOwner.resolve(session)
    const stripeApi = stripeApiFor(owner?.stripeAccount)
    // Both halves must be the caller's, or one owner's payment could settle
    // another's invoice.
    const path = `/invoices/${encodeURIComponent(stripeInvoiceId)}`
    await getOwnedStripeResource(stripeApi, kysely, owner, path)
    await getOwnedStripeResource(
      stripeApi,
      kysely,
      owner,
      `/payment_intents/${encodeURIComponent(paymentIntentId)}`
    )
    const invoice = await stripeApi.post<StripeInvoice>(
      `${path}/attach_payment`,
      { payment_intent: paymentIntentId }
    )
    return { invoiceId: invoice.id, status: invoice.status ?? 'unknown' }
  },
})

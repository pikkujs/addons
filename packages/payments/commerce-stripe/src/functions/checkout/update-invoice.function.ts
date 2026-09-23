import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { getOwnedStripeResource } from '../../lib/owned-resource.js'

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
  func: async ({ stripeApiFor, kysely, paymentOwner }, { stripeInvoiceId, description, metadata }, { session }) => {
    const owner = await paymentOwner.resolve(session)
    const stripeApi = stripeApiFor(owner?.stripeAccount)
    const path = `/invoices/${encodeURIComponent(stripeInvoiceId)}`
    await getOwnedStripeResource(stripeApi, kysely, owner, path)
    const invoice = await stripeApi.post<StripeInvoice>(path, {
      ...(description === undefined ? {} : { description }),
      ...(metadata ? { metadata } : {}),
    })
    return { invoiceId: invoice.id, status: invoice.status ?? 'unknown' }
  },
})

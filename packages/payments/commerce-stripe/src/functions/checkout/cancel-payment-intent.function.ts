import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { getOwnedStripeResource } from '../../lib/owned-resource.js'

export const CancelPaymentIntentInput = z.object({
  paymentIntentId: z.string(),
})

export const CancelPaymentIntentOutput = z.object({
  paymentIntentId: z.string(),
  status: z.string(),
})

type StripeIntent = { id: string; status?: string }

/**
 * Cancels a Stripe PaymentIntent, releasing an order the shop has cancelled so
 * it can never be charged.
 */
export const cancelPaymentIntent = pikkuSessionlessFunc({
  description: 'Cancel a Stripe PaymentIntent',
  node: { displayName: 'Cancel Payment Intent', category: 'Checkout', type: 'action' },
  input: CancelPaymentIntentInput,
  output: CancelPaymentIntentOutput,
  tags: ['addon'],
  func: async ({ stripeApiFor, kysely, paymentOwner }, { paymentIntentId }, { session }) => {
    const owner = await paymentOwner.resolve(session)
    const stripeApi = stripeApiFor(owner?.stripeAccount)
    const path = `/payment_intents/${encodeURIComponent(paymentIntentId)}`
    await getOwnedStripeResource(stripeApi, kysely, owner, path)
    const intent = await stripeApi.post<StripeIntent>(`${path}/cancel`)
    return { paymentIntentId: intent.id, status: intent.status ?? 'unknown' }
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'

export const CheckoutSessionCreateInput = z.object({
  mode: z.enum(['subscription', 'payment', 'setup']).describe('The mode of the checkout session. subscription for recurring plans, payment for one-off (e.g. AI top-ups), setup to save a card'),
  priceId: z.string().describe('The price id to put on the session line item'),
  quantity: z.number().optional().describe('Quantity of the line item. Defaults to 1'),
  success_url: z.string().describe('URL the customer is redirected to after a successful payment. Supports the {CHECKOUT_SESSION_ID} template variable'),
  cancel_url: z.string().describe('URL the customer is redirected to if they cancel'),
  customer: z.string().optional().describe('Existing Stripe customer id to attach the session to. Reuse the org\'s customer so the subscription lands on it'),
  client_reference_id: z.string().optional().describe('An opaque value to associate the session with an internal entity (e.g. the organization id). Echoed back on checkout.session.completed'),
  metadata: MetadataSchema.optional().describe('Key-value pairs attached to the session'),
})

export const CheckoutSessionCreateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('checkout.session').describe('String representing the object\'s type'),
  url: z.string().nullable().describe('The URL to redirect the customer to in order to complete the checkout'),
  mode: z.string().describe('The mode of the session'),
  customer: z.string().nullable().describe('ID of the customer for this session'),
  status: z.string().nullable().describe('The status of the session: open, complete or expired'),
})

type Output = z.infer<typeof CheckoutSessionCreateOutput>

export const checkoutSessionCreate = pikkuSessionlessFunc({
  description: 'Create a Stripe Checkout session for a subscription plan or a one-off payment, returning a hosted payment URL',
  node: { displayName: 'Create Checkout Session', category: 'Checkout', type: 'action' },
  input: CheckoutSessionCreateInput,
  output: CheckoutSessionCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.checkout.sessions.create({
      mode: data.mode,
      line_items: [{ price: data.priceId, quantity: data.quantity ?? 1 }],
      success_url: data.success_url,
      cancel_url: data.cancel_url,
      ...(data.customer ? { customer: data.customer } : {}),
      ...(data.client_reference_id ? { client_reference_id: data.client_reference_id } : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    }) as unknown as Output
  },
})

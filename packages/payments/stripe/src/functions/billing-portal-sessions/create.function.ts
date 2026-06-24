import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BillingPortalSessionCreateInput = z.object({
  customer: z.string().describe('The Stripe customer id to open the billing portal for'),
  return_url: z.string().describe('URL the customer is redirected to when they leave the portal'),
})

export const BillingPortalSessionCreateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('billing_portal.session').describe('String representing the object\'s type'),
  url: z.string().describe('The short-lived URL of the customer portal session'),
  customer: z.string().describe('The customer for this portal session'),
  return_url: z.string().nullable().describe('The configured return URL'),
})

type Output = z.infer<typeof BillingPortalSessionCreateOutput>

export const billingPortalSessionCreate = pikkuSessionlessFunc({
  description: 'Create a Stripe billing portal session so a customer can self-manage their subscription and payment methods',
  node: { displayName: 'Create Billing Portal Session', category: 'Checkout', type: 'action' },
  input: BillingPortalSessionCreateInput,
  output: BillingPortalSessionCreateOutput,
  func: async ({ stripe }, { customer, return_url }) => {
    return await stripe.billingPortal.sessions.create({
      customer,
      return_url,
    }) as unknown as Output
  },
})

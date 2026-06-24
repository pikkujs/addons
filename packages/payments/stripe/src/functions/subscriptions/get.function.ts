import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubscriptionGetInput = z.object({
  subscriptionId: z.string().describe('The identifier of the subscription to retrieve'),
})

export const SubscriptionGetOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('subscription').describe('String representing the object\'s type'),
  customer: z.string().describe('ID of the customer who owns the subscription'),
  status: z.string().describe('Status of the subscription: active, past_due, unpaid, canceled, incomplete, incomplete_expired, trialing or paused'),
  current_period_end: z.number().describe('End of the current period that the subscription has been invoiced for. Measured in seconds since the Unix epoch'),
  current_period_start: z.number().describe('Start of the current period that the subscription has been invoiced for. Measured in seconds since the Unix epoch'),
  cancel_at_period_end: z.boolean().describe('Whether this subscription will (if status=active) or did (if status=canceled) cancel at the end of the current billing period'),
  default_payment_method: z.string().nullable().describe('ID of the default payment method for the subscription'),
  created: z.number().describe('Time at which the object was created. Measured in seconds since the Unix epoch'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
})

type Output = z.infer<typeof SubscriptionGetOutput>

export const subscriptionGet = pikkuSessionlessFunc({
  description: 'Retrieve a subscription by its identifier',
  node: { displayName: 'Get Subscription', category: 'Subscriptions', type: 'action' },
  input: SubscriptionGetInput,
  output: SubscriptionGetOutput,
  func: async ({ stripe }, { subscriptionId }) => {
    return await stripe.subscriptions.retrieve(subscriptionId) as unknown as Output
  },
})

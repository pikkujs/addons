import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const SubscriptionGetInput = z.object({
  subscriptionId: z.string().describe('The identifier of the subscription to retrieve'),
})

export const SubscriptionGetOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('subscription').describe('String representing the object\'s type'),
  customer: z.string().describe('ID of the customer who owns the subscription'),
  status: z.string().describe('Status of the subscription: active, past_due, unpaid, canceled, incomplete, incomplete_expired, trialing or paused'),
  currentPeriodEnd: z.string().datetime().describe('End of the current period that the subscription has been invoiced for'),
  currentPeriodStart: z.string().datetime().describe('Start of the current period that the subscription has been invoiced for'),
  cancelAtPeriodEnd: z.boolean().describe('Whether this subscription will (if status=active) or did (if status=canceled) cancel at the end of the current billing period'),
  defaultPaymentMethod: z.string().nullable().describe('ID of the default payment method for the subscription'),
  created: z.string().datetime().describe('Time at which the object was created'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
})

export const subscriptionGet = pikkuSessionlessFunc({
  description: 'Retrieve a subscription by its identifier',
  node: { displayName: 'Get Subscription', category: 'Subscriptions', type: 'action' },
  input: SubscriptionGetInput,
  output: SubscriptionGetOutput,
  func: async ({ stripe }, { subscriptionId }) => {
    const result = await stripe.subscriptions.retrieve(subscriptionId)
    const camel = fromStripeObject(result)
    return SubscriptionGetOutput.parse({
      ...camel,
      created: epochToIso(result.created),
      currentPeriodStart: epochToIso((result as any).current_period_start),
      currentPeriodEnd: epochToIso((result as any).current_period_end),
    })
  },
})

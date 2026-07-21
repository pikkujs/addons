import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const SubscriptionCancelInput = z.object({
  subscriptionId: z.string().describe('The identifier of the subscription to cancel'),
  atPeriodEnd: z.boolean().optional().describe('When true, cancel at the end of the current billing period (keeps access until then) rather than immediately'),
})

export const SubscriptionCancelOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('subscription').describe('String representing the object\'s type'),
  status: z.string().describe('Status of the subscription'),
  cancelAtPeriodEnd: z.boolean().describe('Whether the subscription will cancel at period end'),
  canceledAt: z.string().datetime().nullable().describe('If the subscription has been canceled, the date of that cancellation'),
})

export const subscriptionCancel = pikkuSessionlessFunc({
  description: 'Cancel a subscription, either immediately or at the end of the current billing period',
  node: { displayName: 'Cancel Subscription', category: 'Subscriptions', type: 'action' },
  input: SubscriptionCancelInput,
  output: SubscriptionCancelOutput,
  func: async ({ stripe }, { subscriptionId, atPeriodEnd }) => {
    const result = atPeriodEnd
      ? await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true })
      : await stripe.subscriptions.cancel(subscriptionId)
    const camel = fromStripeObject(result)
    return SubscriptionCancelOutput.parse({ ...camel, canceledAt: epochToIso(result.canceled_at) })
  },
})

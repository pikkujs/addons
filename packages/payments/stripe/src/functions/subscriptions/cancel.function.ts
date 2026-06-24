import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubscriptionCancelInput = z.object({
  subscriptionId: z.string().describe('The identifier of the subscription to cancel'),
  at_period_end: z.boolean().optional().describe('When true, cancel at the end of the current billing period (keeps access until then) rather than immediately'),
})

export const SubscriptionCancelOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('subscription').describe('String representing the object\'s type'),
  status: z.string().describe('Status of the subscription'),
  cancel_at_period_end: z.boolean().describe('Whether the subscription will cancel at period end'),
  canceled_at: z.number().nullable().describe('If the subscription has been canceled, the date of that cancellation. Measured in seconds since the Unix epoch'),
})

type Output = z.infer<typeof SubscriptionCancelOutput>

export const subscriptionCancel = pikkuSessionlessFunc({
  description: 'Cancel a subscription, either immediately or at the end of the current billing period',
  node: { displayName: 'Cancel Subscription', category: 'Subscriptions', type: 'action' },
  input: SubscriptionCancelInput,
  output: SubscriptionCancelOutput,
  func: async ({ stripe }, { subscriptionId, at_period_end }) => {
    if (at_period_end) {
      return await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      }) as unknown as Output
    }
    return await stripe.subscriptions.cancel(subscriptionId) as unknown as Output
  },
})

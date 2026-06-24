import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubscriptionUpdateInput = z.object({
  subscriptionId: z.string().describe('The identifier of the subscription to update'),
  itemId: z.string().describe('The subscription item id to swap (from subscription.items.data[0].id)'),
  priceId: z.string().describe('The new price id to switch the subscription item to'),
  proration_behavior: z.enum(['create_prorations', 'none', 'always_invoice']).optional().describe('Determines how to handle prorations when switching plans mid-cycle. Defaults to create_prorations so Stripe prorates the difference'),
  cancel_at_period_end: z.boolean().optional().describe('Set to true to schedule the subscription to cancel at the end of the current period instead of immediately'),
})

export const SubscriptionUpdateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('subscription').describe('String representing the object\'s type'),
  status: z.string().describe('Status of the subscription'),
  cancel_at_period_end: z.boolean().describe('Whether the subscription will cancel at period end'),
  current_period_end: z.number().describe('End of the current period. Measured in seconds since the Unix epoch'),
})

type Output = z.infer<typeof SubscriptionUpdateOutput>

export const subscriptionUpdate = pikkuSessionlessFunc({
  description: 'Switch a subscription to a different price (plan change). Stripe prorates the difference mid-cycle by default',
  node: { displayName: 'Update Subscription', category: 'Subscriptions', type: 'action' },
  input: SubscriptionUpdateInput,
  output: SubscriptionUpdateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.subscriptions.update(data.subscriptionId, {
      items: [{ id: data.itemId, price: data.priceId }],
      proration_behavior: data.proration_behavior ?? 'create_prorations',
      ...(data.cancel_at_period_end !== undefined
        ? { cancel_at_period_end: data.cancel_at_period_end }
        : {}),
    }) as unknown as Output
  },
})

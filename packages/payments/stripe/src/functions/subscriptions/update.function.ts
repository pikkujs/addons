import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const SubscriptionUpdateInput = z.object({
  subscriptionId: z.string().describe('The identifier of the subscription to update'),
  itemId: z.string().describe('The subscription item id to swap (from subscription.items.data[0].id)'),
  priceId: z.string().describe('The new price id to switch the subscription item to'),
  prorationBehavior: z.enum(['create_prorations', 'none', 'always_invoice']).optional().describe('Determines how to handle prorations when switching plans mid-cycle. Defaults to create_prorations so Stripe prorates the difference'),
  cancelAtPeriodEnd: z.boolean().optional().describe('Set to true to schedule the subscription to cancel at the end of the current period instead of immediately'),
})

export const SubscriptionUpdateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('subscription').describe('String representing the object\'s type'),
  status: z.string().describe('Status of the subscription'),
  cancelAtPeriodEnd: z.boolean().describe('Whether the subscription will cancel at period end'),
  currentPeriodEnd: z.string().datetime().describe('End of the current period'),
})

export const subscriptionUpdate = pikkuSessionlessFunc({
  description: 'Switch a subscription to a different price (plan change). Stripe prorates the difference mid-cycle by default',
  node: { displayName: 'Update Subscription', category: 'Subscriptions', type: 'action' },
  input: SubscriptionUpdateInput,
  output: SubscriptionUpdateOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.subscriptions.update(data.subscriptionId, {
      items: [{ id: data.itemId, price: data.priceId }],
      proration_behavior: data.prorationBehavior ?? 'create_prorations',
      ...(data.cancelAtPeriodEnd !== undefined
        ? { cancel_at_period_end: data.cancelAtPeriodEnd }
        : {}),
    })
    const camel = fromStripeObject(result)
    return SubscriptionUpdateOutput.parse({
      ...camel,
      currentPeriodEnd: epochToIso((result as any).current_period_end),
    })
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubscriptionsListInput = z.object({
  status: z.enum(['active', 'canceled', 'past_due', 'paused', 'trialing']).optional().describe('Filter by status'),
  customer_id: z.string().optional().describe('Filter by customer ID'),
  price_id: z.string().optional().describe('Filter by price ID'),
  per_page: z.number().optional().describe('Results per page'),
  after: z.string().optional().describe('Cursor for pagination'),
})

export const SubscriptionsListOutput = z.object({
  data: z.array(z.object({
    id: z.string(),
    status: z.string(),
    customer_id: z.string(),
    currency_code: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    started_at: z.string().nullable(),
    current_billing_period: z.object({
      starts_at: z.string(),
      ends_at: z.string(),
    }).nullable(),
  })),
  meta: z.object({
    request_id: z.string(),
    pagination: z.object({
      per_page: z.number(),
      next: z.string().nullable(),
      has_more: z.boolean(),
    }),
  }),
})

type Output = z.infer<typeof SubscriptionsListOutput>

export const subscriptionsList = pikkuSessionlessFunc({
  description: 'List Paddle subscriptions',
  node: { displayName: 'List Subscriptions', category: 'Subscriptions', type: 'action' },
  input: SubscriptionsListInput,
  output: SubscriptionsListOutput,
  func: async ({ paddle }, data) => {
  return await paddle.request('GET', 'subscriptions', { qs: data as Record<string, string | number | boolean | undefined> }) as Output
  },
})

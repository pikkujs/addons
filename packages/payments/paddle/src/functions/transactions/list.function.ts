import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TransactionsListInput = z.object({
  status: z.enum(['draft', 'ready', 'billed', 'completed', 'canceled', 'past_due']).optional().describe('Filter by status'),
  customer_id: z.string().optional().describe('Filter by customer ID'),
  subscription_id: z.string().optional().describe('Filter by subscription ID'),
  per_page: z.number().optional().describe('Results per page'),
  after: z.string().optional().describe('Cursor for pagination'),
})

export const TransactionsListOutput = z.object({
  data: z.array(z.object({
    id: z.string(),
    status: z.string(),
    customer_id: z.string().nullable(),
    subscription_id: z.string().nullable(),
    currency_code: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
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

type Output = z.infer<typeof TransactionsListOutput>

export const transactionsList = pikkuSessionlessFunc({
  description: 'List Paddle transactions',
  node: { displayName: 'List Transactions', category: 'Transactions', type: 'action' },
  input: TransactionsListInput,
  output: TransactionsListOutput,
  func: async ({ paddle }, data) => {
  return await paddle.request('GET', 'transactions', { qs: data as Record<string, string | number | boolean | undefined> }) as Output
  },
})

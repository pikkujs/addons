import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  status: z.enum(['active', 'archived']).optional().describe('Filter by status'),
  per_page: z.number().optional().describe('Results per page'),
  after: z.string().optional().describe('Cursor for pagination'),
})

const outputSchema = z.object({
  data: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    status: z.string(),
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

type Output = z.infer<typeof outputSchema>

export const productsList = pikkuSessionlessFunc({
  description: 'List Paddle products',
  node: { displayName: 'List Products', category: 'Products', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ paddle }, data) => {
  return await paddle.request('GET', 'products', { qs: data as Record<string, string | number | boolean | undefined> }) as Output
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FormsListInput = z.object({
  offset: z.number().optional().describe('Start of each result set'),
  limit: z.number().optional().describe('Number of results (max 1000)'),
  filter: z.record(z.string(), z.string()).optional().describe('Filter results'),
  orderBy: z.string().optional().describe('Order results by field'),
})

export const FormsListOutput = z.object({
  responseCode: z.number(),
  message: z.string(),
  content: z.array(z.object({
    id: z.string(),
    username: z.string(),
    title: z.string(),
    height: z.string(),
    status: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    count: z.string(),
    new: z.string(),
  })),
  resultSet: z.object({
    offset: z.number(),
    limit: z.number(),
    count: z.number(),
  }),
})

type Output = z.infer<typeof FormsListOutput>

export const formsList = pikkuSessionlessFunc({
  description: 'List all forms for the user',
  node: { displayName: 'List Forms', category: 'Forms', type: 'action' },
  input: FormsListInput,
  output: FormsListOutput,
  func: async ({ jotform }, data) => {
  return await jotform.request('GET', 'user/forms', {
    qs: {
      offset: data.offset,
      limit: data.limit,
      orderby: data.orderBy,
    },
  }) as Output
  },
})

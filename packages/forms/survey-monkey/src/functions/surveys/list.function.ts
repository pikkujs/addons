import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  page: z.number().optional().describe('Page number'),
  perPage: z.number().optional().describe('Results per page'),
  sortBy: z.enum(['title', 'date_modified']).optional().describe('Sort by field'),
  sortOrder: z.enum(['ASC', 'DESC']).optional().describe('Sort order'),
})

const outputSchema = z.object({
  data: z.array(z.object({
    id: z.string(),
    title: z.string(),
    nickname: z.string(),
    href: z.string(),
  })),
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  links: z.object({
    self: z.string(),
  }),
})

type Output = z.infer<typeof outputSchema>

export const surveysList = pikkuSessionlessFunc({
  description: 'List all surveys',
  node: { displayName: 'List Surveys', category: 'Forms', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ surveyMonkey }, data) => {
  return await surveyMonkey.request('GET', 'surveys', {
    qs: {
      page: data.page,
      per_page: data.perPage,
      sort_by: data.sortBy,
      sort_order: data.sortOrder,
    },
  }) as Output
  },
})

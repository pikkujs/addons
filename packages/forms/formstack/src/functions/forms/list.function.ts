import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  folders: z.boolean().optional().describe('Include folder information'),
  page: z.number().optional().describe('Page number'),
  perPage: z.number().optional().describe('Results per page'),
})

const outputSchema = z.object({
  forms: z.array(z.object({
    id: z.string(),
    name: z.string(),
    views: z.string(),
    created: z.string(),
    updated: z.string(),
    submissions: z.string(),
    submissions_unread: z.string(),
    url: z.string(),
  })),
})

type Output = z.infer<typeof outputSchema>

export const formsList = pikkuSessionlessFunc({
  description: 'List all Formstack forms',
  node: { displayName: 'List Forms', category: 'Forms', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ formstack }, data) => {
  return await formstack.request('GET', 'form.json', {
    qs: {
      folders: data.folders,
      page: data.page,
      per_page: data.perPage,
    },
  }) as Output
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FormsListInput = z.object({
  folders: z.boolean().optional().describe('Include folder information'),
  page: z.number().optional().describe('Page number'),
  perPage: z.number().optional().describe('Results per page'),
})

export const FormsListOutput = z.object({
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

type Output = z.infer<typeof FormsListOutput>

export const formsList = pikkuSessionlessFunc({
  description: 'List all Formstack forms',
  node: { displayName: 'List Forms', category: 'Forms', type: 'action' },
  input: FormsListInput,
  output: FormsListOutput,
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

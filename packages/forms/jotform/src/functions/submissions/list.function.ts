import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubmissionsListInput = z.object({
  formId: z.string().describe('Form ID'),
  offset: z.number().optional().describe('Start of each result set'),
  limit: z.number().optional().describe('Number of results (max 1000)'),
  filter: z.record(z.string(), z.string()).optional().describe('Filter results'),
  orderBy: z.string().optional().describe('Order results by field'),
})

export const SubmissionsListOutput = z.object({
  responseCode: z.number(),
  message: z.string(),
  content: z.array(z.object({
    id: z.string(),
    form_id: z.string(),
    ip: z.string(),
    created_at: z.string(),
    updated_at: z.string().nullable(),
    status: z.string(),
    new: z.string(),
    answers: z.record(z.string(), z.object({
      name: z.string(),
      order: z.string(),
      text: z.string(),
      type: z.string(),
      answer: z.unknown().optional(),
    })),
  })),
  resultSet: z.object({
    offset: z.number(),
    limit: z.number(),
    count: z.number(),
  }),
})

type Output = z.infer<typeof SubmissionsListOutput>

export const submissionsList = pikkuSessionlessFunc({
  description: 'List submissions for a form',
  node: { displayName: 'List Submissions', category: 'Forms', type: 'action' },
  input: SubmissionsListInput,
  output: SubmissionsListOutput,
  func: async ({ jotform }, data) => {
  return await jotform.request('GET', `form/${data.formId}/submissions`, {
    qs: {
      offset: data.offset,
      limit: data.limit,
      orderby: data.orderBy,
    },
  }) as Output
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubmissionsListInput = z.object({
  formId: z.string().describe('Form ID'),
  page: z.number().optional().describe('Page number'),
  perPage: z.number().optional().describe('Results per page'),
  sort: z.enum(['ASC', 'DESC']).optional().describe('Sort direction'),
  data: z.boolean().optional().describe('Include field data'),
  minTime: z.string().optional().describe('Minimum timestamp (YYYY-MM-DD HH:MM:SS)'),
  maxTime: z.string().optional().describe('Maximum timestamp (YYYY-MM-DD HH:MM:SS)'),
})

export const SubmissionsListOutput = z.object({
  submissions: z.array(z.object({
    id: z.string(),
    timestamp: z.string(),
    user_agent: z.string(),
    remote_addr: z.string(),
    payment_status: z.string().nullable(),
    data: z.array(z.object({
      field: z.string(),
      value: z.unknown(),
    })).optional(),
  })),
  total: z.number(),
  pages: z.number(),
})

type Output = z.infer<typeof SubmissionsListOutput>

export const submissionsList = pikkuSessionlessFunc({
  description: 'List submissions for a form',
  node: { displayName: 'List Submissions', category: 'Forms', type: 'action' },
  input: SubmissionsListInput,
  output: SubmissionsListOutput,
  func: async ({ formstack }, data) => {
  return await formstack.request('GET', `form/${data.formId}/submission.json`, {
    qs: {
      page: data.page,
      per_page: data.perPage,
      sort: data.sort,
      data: data.data,
      min_time: data.minTime,
      max_time: data.maxTime,
    },
  }) as Output
  },
})

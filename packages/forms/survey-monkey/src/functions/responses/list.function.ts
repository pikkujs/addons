import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ResponsesListInput = z.object({
  surveyId: z.string().describe('Survey ID'),
  page: z.number().optional().describe('Page number'),
  perPage: z.number().optional().describe('Results per page'),
  startCreatedAt: z.string().optional().describe('Start date (ISO format)'),
  endCreatedAt: z.string().optional().describe('End date (ISO format)'),
  status: z.enum(['completed', 'partial', 'overquota', 'disqualified']).optional().describe('Response status'),
})

export const ResponsesListOutput = z.object({
  data: z.array(z.object({
    id: z.string(),
    href: z.string(),
    survey_id: z.string(),
    collector_id: z.string(),
    date_created: z.string(),
    date_modified: z.string(),
    response_status: z.string(),
    ip_address: z.string(),
    total_time: z.number(),
  })),
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  links: z.object({
    self: z.string(),
  }),
})

type Output = z.infer<typeof ResponsesListOutput>

export const responsesList = pikkuSessionlessFunc({
  description: 'List responses for a survey',
  node: { displayName: 'List Responses', category: 'Forms', type: 'action' },
  input: ResponsesListInput,
  output: ResponsesListOutput,
  func: async ({ surveyMonkey }, data) => {
  return await surveyMonkey.request('GET', `surveys/${data.surveyId}/responses`, {
    qs: {
      page: data.page,
      per_page: data.perPage,
      start_created_at: data.startCreatedAt,
      end_created_at: data.endCreatedAt,
      status: data.status,
    },
  }) as Output
  },
})

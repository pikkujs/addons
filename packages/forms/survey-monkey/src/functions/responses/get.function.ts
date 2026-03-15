import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ResponsesGetInput = z.object({
  surveyId: z.string().describe('Survey ID'),
  responseId: z.string().describe('Response ID'),
})

export const ResponsesGetOutput = z.object({
  id: z.string(),
  survey_id: z.string(),
  collector_id: z.string(),
  recipient_id: z.string(),
  date_created: z.string(),
  date_modified: z.string(),
  response_status: z.string(),
  ip_address: z.string(),
  total_time: z.number(),
  pages: z.array(z.object({
    id: z.string(),
    questions: z.array(z.object({
      id: z.string(),
      answers: z.array(z.object({
        choice_id: z.string().optional(),
        text: z.string().optional(),
        row_id: z.string().optional(),
        col_id: z.string().optional(),
      })),
    })),
  })),
})

type Output = z.infer<typeof ResponsesGetOutput>

export const responsesGet = pikkuSessionlessFunc({
  description: 'Get details of a specific response',
  node: { displayName: 'Get Response', category: 'Forms', type: 'action' },
  input: ResponsesGetInput,
  output: ResponsesGetOutput,
  func: async ({ surveyMonkey }, data) => {
  return await surveyMonkey.request('GET', `surveys/${data.surveyId}/responses/${data.responseId}`) as Output
  },
})

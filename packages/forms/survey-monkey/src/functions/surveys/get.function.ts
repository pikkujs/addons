import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  surveyId: z.string().describe('Survey ID'),
})

const outputSchema = z.object({
  id: z.string(),
  title: z.string(),
  nickname: z.string(),
  custom_variables: z.record(z.string(), z.string()).optional(),
  language: z.string(),
  question_count: z.number(),
  page_count: z.number(),
  date_created: z.string(),
  date_modified: z.string(),
  href: z.string(),
  buttons_text: z.object({
    next_button: z.string(),
    prev_button: z.string(),
    done_button: z.string(),
    exit_button: z.string(),
  }),
})

type Output = z.infer<typeof outputSchema>

export const surveysGet = pikkuSessionlessFunc({
  description: 'Get details of a specific survey',
  node: { displayName: 'Get Survey', category: 'Forms', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ surveyMonkey }, data) => {
  return await surveyMonkey.request('GET', `surveys/${data.surveyId}`) as Output
  },
})

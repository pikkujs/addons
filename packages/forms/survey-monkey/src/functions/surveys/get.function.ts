import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SurveysGetInput = z.object({
  surveyId: z.string().describe('Survey ID'),
})

export const SurveysGetOutput = z.object({
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

type Output = z.infer<typeof SurveysGetOutput>

export const surveysGet = pikkuSessionlessFunc({
  description: 'Get details of a specific survey',
  node: { displayName: 'Get Survey', category: 'Forms', type: 'action' },
  input: SurveysGetInput,
  output: SurveysGetOutput,
  func: async ({ surveyMonkey }, data) => {
  return await surveyMonkey.request('GET', `surveys/${data.surveyId}`) as Output
  },
})

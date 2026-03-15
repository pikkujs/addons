import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubmissionsGetInput = z.object({
  submissionId: z.string().describe('Submission ID'),
})

export const SubmissionsGetOutput = z.object({
  responseCode: z.number(),
  message: z.string(),
  content: z.object({
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
  }),
})

type Output = z.infer<typeof SubmissionsGetOutput>

export const submissionsGet = pikkuSessionlessFunc({
  description: 'Get details of a specific submission',
  node: { displayName: 'Get Submission', category: 'Forms', type: 'action' },
  input: SubmissionsGetInput,
  output: SubmissionsGetOutput,
  func: async ({ jotform }, data) => {
  return await jotform.request('GET', `submission/${data.submissionId}`) as Output
  },
})

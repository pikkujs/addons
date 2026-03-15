import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FormsGetInput = z.object({
  formId: z.string().describe('Form ID'),
})

export const FormsGetOutput = z.object({
  responseCode: z.number(),
  message: z.string(),
  content: z.object({
    id: z.string(),
    username: z.string(),
    title: z.string(),
    height: z.string(),
    status: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    count: z.string(),
    new: z.string(),
  }),
})

type Output = z.infer<typeof FormsGetOutput>

export const formsGet = pikkuSessionlessFunc({
  description: 'Get details of a specific form',
  node: { displayName: 'Get Form', category: 'Forms', type: 'action' },
  input: FormsGetInput,
  output: FormsGetOutput,
  func: async ({ jotform }, data) => {
  return await jotform.request('GET', `form/${data.formId}`) as Output
  },
})

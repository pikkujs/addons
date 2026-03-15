import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FormsGetInput = z.object({
  formId: z.string().describe('Form ID'),
})

export const FormsGetOutput = z.object({
  id: z.string(),
  name: z.string(),
  views: z.string(),
  created: z.string(),
  updated: z.string(),
  submissions: z.string(),
  submissions_unread: z.string(),
  url: z.string(),
  fields: z.array(z.object({
    id: z.string(),
    label: z.string(),
    type: z.string(),
    required: z.string(),
    readonly: z.string(),
    hidden: z.string(),
  })),
})

type Output = z.infer<typeof FormsGetOutput>

export const formsGet = pikkuSessionlessFunc({
  description: 'Get details of a specific form',
  node: { displayName: 'Get Form', category: 'Forms', type: 'action' },
  input: FormsGetInput,
  output: FormsGetOutput,
  func: async ({ formstack }, data) => {
  return await formstack.request('GET', `form/${data.formId}.json`) as Output
  },
})

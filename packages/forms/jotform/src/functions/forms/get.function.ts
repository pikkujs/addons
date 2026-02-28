import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  formId: z.string().describe('Form ID'),
})

const outputSchema = z.object({
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

type Output = z.infer<typeof outputSchema>

export const formsGet = pikkuSessionlessFunc({
  description: 'Get details of a specific form',
  node: { displayName: 'Get Form', category: 'Forms', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ jotform }, data) => {
  return await jotform.request('GET', `form/${data.formId}`) as Output
  },
})

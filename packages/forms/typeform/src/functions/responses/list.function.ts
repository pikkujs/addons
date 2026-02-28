import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  formId: z.string().describe('Form ID'),
  pageSize: z.number().optional().describe('Number of results per page'),
  since: z.string().optional().describe('Responses since date (ISO format)'),
  until: z.string().optional().describe('Responses until date (ISO format)'),
  after: z.string().optional().describe('Cursor for pagination'),
  before: z.string().optional().describe('Cursor for pagination'),
  completed: z.boolean().optional().describe('Filter by completion status'),
})

const outputSchema = z.object({
  items: z.array(z.object({
    response_id: z.string(),
    landed_at: z.string(),
    submitted_at: z.string(),
    answers: z.array(z.object({
      field: z.object({
        id: z.string(),
        type: z.string(),
        ref: z.string().optional(),
      }),
      type: z.string(),
      text: z.string().optional(),
      email: z.string().optional(),
      number: z.number().optional(),
      boolean: z.boolean().optional(),
      choice: z.object({
        label: z.string(),
      }).optional(),
    })),
  })),
  total_items: z.number(),
  page_count: z.number(),
})

type Output = z.infer<typeof outputSchema>

export const responsesList = pikkuSessionlessFunc({
  description: 'List responses for a Typeform',
  node: { displayName: 'List Responses', category: 'Forms', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ typeform }, data) => {
  return await typeform.request('GET', `forms/${data.formId}/responses`, {
    qs: {
      page_size: data.pageSize,
      since: data.since,
      until: data.until,
      after: data.after,
      before: data.before,
      completed: data.completed,
    },
  }) as Output
  },
})

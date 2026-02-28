import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  questionId: z.number().describe('Question (card) ID'),
})

const outputSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  display: z.string(),
  collection_id: z.number().nullable(),
  database_id: z.number(),
  table_id: z.number().nullable(),
  query_type: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  archived: z.boolean(),
  result_metadata: z.array(z.object({
    name: z.string(),
    display_name: z.string(),
    base_type: z.string(),
  })).optional(),
})

type Input = z.infer<typeof inputSchema>
type Output = z.infer<typeof outputSchema>

export const questionsGet = pikkuSessionlessFunc({
  description: 'Get details of a specific question (card)',
  node: { displayName: 'Get Question', category: 'Analytics', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ metabase }, data) => {
    return await metabase.request('GET', `card/${data.questionId}`) as Output
  },
})

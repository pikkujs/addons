import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const QuestionsListInput = z.object({})

export const QuestionsListOutput = z.array(z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  display: z.string(),
  collection_id: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  archived: z.boolean(),
}))

type Output = z.infer<typeof QuestionsListOutput>

export const questionsList = pikkuSessionlessFunc({
  description: 'List all saved questions (cards) in Metabase',
  node: { displayName: 'List Questions', category: 'Analytics', type: 'action' },
  input: QuestionsListInput,
  output: QuestionsListOutput,
  func: async ({ metabase }) => {
    return await metabase.request('GET', 'card') as Output
  },
})

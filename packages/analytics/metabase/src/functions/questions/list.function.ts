import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({})

const outputSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  display: z.string(),
  collection_id: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  archived: z.boolean(),
}))

type Output = z.infer<typeof outputSchema>

export const questionsList = pikkuSessionlessFunc({
  description: 'List all saved questions (cards) in Metabase',
  node: { displayName: 'List Questions', category: 'Analytics', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ metabase }) => {
    return await metabase.request('GET', 'card') as Output
  },
})

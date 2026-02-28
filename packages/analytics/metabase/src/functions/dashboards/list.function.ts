import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({})

const outputSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  collection_id: z.number().nullable(),
  creator_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  archived: z.boolean(),
}))

type Output = z.infer<typeof outputSchema>

export const dashboardsList = pikkuSessionlessFunc({
  description: 'List all dashboards in Metabase',
  node: { displayName: 'List Dashboards', category: 'Analytics', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ metabase }) => {
    return await metabase.request('GET', 'dashboard') as Output
  },
})

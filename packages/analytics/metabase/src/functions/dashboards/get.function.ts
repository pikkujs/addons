import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  dashboardId: z.number().describe('Dashboard ID'),
})

const outputSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  collection_id: z.number().nullable(),
  creator_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  archived: z.boolean(),
  dashcards: z.array(z.object({
    id: z.number(),
    card_id: z.number().nullable(),
    dashboard_id: z.number(),
    size_x: z.number(),
    size_y: z.number(),
    row: z.number(),
    col: z.number(),
  })),
})

type Input = z.infer<typeof inputSchema>
type Output = z.infer<typeof outputSchema>

export const dashboardsGet = pikkuSessionlessFunc({
  description: 'Get details of a specific dashboard',
  node: { displayName: 'Get Dashboard', category: 'Analytics', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ metabase }, data) => {
    return await metabase.request('GET', `dashboard/${data.dashboardId}`) as Output
  },
})

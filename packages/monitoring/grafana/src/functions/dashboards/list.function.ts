import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  query: z.string().optional().describe('Search query'),
  tag: z.array(z.string()).optional().describe('Filter by tags'),
  type: z.enum(['dash-db', 'dash-folder']).optional().describe('Type filter'),
  limit: z.number().optional().describe('Max results'),
})

const outputSchema = z.array(z.object({
  id: z.number(),
  uid: z.string(),
  title: z.string(),
  uri: z.string().optional(),
  url: z.string(),
  type: z.string(),
  tags: z.array(z.string()),
  isStarred: z.boolean().optional(),
}))

type Output = z.infer<typeof outputSchema>

export const dashboardsList = pikkuSessionlessFunc({
  description: 'Search Grafana dashboards',
  node: { displayName: 'List Dashboards', category: 'Dashboards', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ grafana }, data) => {
  return await grafana.request('GET', 'search', { qs: data as Record<string, string | number | boolean | undefined> }) as Output
  },
})

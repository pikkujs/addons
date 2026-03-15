import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DashboardsListInput = z.object({
  query: z.string().optional().describe('Search query'),
  tag: z.array(z.string()).optional().describe('Filter by tags'),
  type: z.enum(['dash-db', 'dash-folder']).optional().describe('Type filter'),
  limit: z.number().optional().describe('Max results'),
})

export const DashboardsListOutput = z.array(z.object({
  id: z.number(),
  uid: z.string(),
  title: z.string(),
  uri: z.string().optional(),
  url: z.string(),
  type: z.string(),
  tags: z.array(z.string()),
  isStarred: z.boolean().optional(),
}))

type Output = z.infer<typeof DashboardsListOutput>

export const dashboardsList = pikkuSessionlessFunc({
  description: 'Search Grafana dashboards',
  node: { displayName: 'List Dashboards', category: 'Dashboards', type: 'action' },
  input: DashboardsListInput,
  output: DashboardsListOutput,
  func: async ({ grafana }, data) => {
  return await grafana.request('GET', 'search', { qs: data as Record<string, string | number | boolean | undefined> }) as Output
  },
})

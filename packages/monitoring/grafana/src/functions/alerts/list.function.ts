import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  dashboardId: z.number().optional().describe('Filter by dashboard ID'),
  panelId: z.number().optional().describe('Filter by panel ID'),
  query: z.string().optional().describe('Search query'),
  state: z.string().optional().describe('Filter by state'),
  limit: z.number().optional().describe('Max results'),
})

const outputSchema = z.array(z.object({
  id: z.number(),
  dashboardId: z.number().optional(),
  dashboardUid: z.string().optional(),
  dashboardSlug: z.string().optional(),
  panelId: z.number().optional(),
  name: z.string(),
  state: z.string(),
  url: z.string().optional(),
}))

type Output = z.infer<typeof outputSchema>

export const alertsList = pikkuSessionlessFunc({
  description: 'List Grafana alerts',
  node: { displayName: 'List Alerts', category: 'Alerts', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ grafana }, data) => {
  return await grafana.request('GET', 'alerts', { qs: data as Record<string, string | number | undefined> }) as Output
  },
})

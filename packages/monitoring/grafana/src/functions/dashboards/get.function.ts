import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  uid: z.string().describe('Dashboard UID'),
})

const outputSchema = z.object({
  dashboard: z.object({
    id: z.number(),
    uid: z.string(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
    timezone: z.string().optional(),
    schemaVersion: z.number().optional(),
  }),
  meta: z.object({
    isStarred: z.boolean().optional(),
    url: z.string(),
    slug: z.string().optional(),
    created: z.string().optional(),
    updated: z.string().optional(),
  }),
})

type Output = z.infer<typeof outputSchema>

export const dashboardsGet = pikkuSessionlessFunc({
  description: 'Get Grafana dashboard by UID',
  node: { displayName: 'Get Dashboard', category: 'Dashboards', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ grafana }, data) => {
  return await grafana.request('GET', `dashboards/uid/${data.uid}`) as Output
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  monitors: z.string().optional().describe('Monitor IDs (comma-separated)'),
  types: z.string().optional().describe('Monitor types (1=HTTP, 2=Keyword, 3=Ping, 4=Port)'),
  statuses: z.string().optional().describe('Monitor statuses (0=paused, 1=not checked, 2=up, 8=seems down, 9=down)'),
  limit: z.number().optional().describe('Max results (max 50)'),
  offset: z.number().optional().describe('Offset for pagination'),
})

const outputSchema = z.object({
  stat: z.string(),
  pagination: z.object({
    offset: z.number(),
    limit: z.number(),
    total: z.number(),
  }).optional(),
  monitors: z.array(z.object({
    id: z.number(),
    friendly_name: z.string(),
    url: z.string(),
    type: z.number(),
    status: z.number(),
    create_datetime: z.number().optional(),
  })),
})

type Output = z.infer<typeof outputSchema>

export const monitorsList = pikkuSessionlessFunc({
  description: 'List UptimeRobot monitors',
  node: { displayName: 'List Monitors', category: 'Monitors', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ uptimerobot }, data) => {
  return await uptimerobot.request('getMonitors', { body: data as Record<string, unknown> }) as Output
  },
})

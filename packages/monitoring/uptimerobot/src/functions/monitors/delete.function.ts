import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  id: z.number().describe('Monitor ID to delete'),
})

const outputSchema = z.object({
  stat: z.string(),
  monitor: z.object({
    id: z.number(),
  }),
})

type Output = z.infer<typeof outputSchema>

export const monitorsDelete = pikkuSessionlessFunc({
  description: 'Delete an UptimeRobot monitor',
  node: { displayName: 'Delete Monitor', category: 'Monitors', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ uptimerobot }, data) => {
  return await uptimerobot.request('deleteMonitor', { body: data as Record<string, unknown> }) as Output
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MonitorsDeleteInput = z.object({
  id: z.number().describe('Monitor ID to delete'),
})

export const MonitorsDeleteOutput = z.object({
  stat: z.string(),
  monitor: z.object({
    id: z.number(),
  }),
})

type Output = z.infer<typeof MonitorsDeleteOutput>

export const monitorsDelete = pikkuSessionlessFunc({
  description: 'Delete an UptimeRobot monitor',
  node: { displayName: 'Delete Monitor', category: 'Monitors', type: 'action' },
  input: MonitorsDeleteInput,
  output: MonitorsDeleteOutput,
  func: async ({ uptimerobot }, data) => {
  return await uptimerobot.request('deleteMonitor', { body: data as Record<string, unknown> }) as Output
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MonitorsCreateInput = z.object({
  friendly_name: z.string().describe('Monitor name'),
  url: z.string().describe('URL to monitor'),
  type: z.number().describe('Monitor type (1=HTTP, 2=Keyword, 3=Ping, 4=Port)'),
  interval: z.number().optional().describe('Monitoring interval in seconds (min 60)'),
  http_method: z.number().optional().describe('HTTP method (1=HEAD, 2=GET, 3=POST, 4=PUT, 5=PATCH, 6=DELETE, 7=OPTIONS)'),
  alert_contacts: z.string().optional().describe('Alert contact IDs'),
})

export const MonitorsCreateOutput = z.object({
  stat: z.string(),
  monitor: z.object({
    id: z.number(),
    status: z.number(),
  }),
})

type Output = z.infer<typeof MonitorsCreateOutput>

export const monitorsCreate = pikkuSessionlessFunc({
  description: 'Create an UptimeRobot monitor',
  node: { displayName: 'Create Monitor', category: 'Monitors', type: 'action' },
  input: MonitorsCreateInput,
  output: MonitorsCreateOutput,
  func: async ({ uptimerobot }, data) => {
  return await uptimerobot.request('newMonitor', { body: data as Record<string, unknown> }) as Output
  },
})

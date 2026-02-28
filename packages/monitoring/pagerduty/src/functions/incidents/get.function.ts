import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  id: z.string().describe('Incident ID'),
})

const outputSchema = z.object({
  incident: z.object({
    id: z.string(),
    incident_number: z.number().optional(),
    title: z.string(),
    description: z.string().nullable().optional(),
    status: z.string(),
    urgency: z.string().optional(),
    created_at: z.string().optional(),
    html_url: z.string().optional(),
    service: z.object({
      id: z.string(),
      summary: z.string(),
    }).optional(),
    assignments: z.array(z.object({
      at: z.string(),
      assignee: z.object({
        id: z.string(),
        summary: z.string(),
      }),
    })).optional(),
  }),
})

type Output = z.infer<typeof outputSchema>

export const incidentsGet = pikkuSessionlessFunc({
  description: 'Get PagerDuty incident details',
  node: { displayName: 'Get Incident', category: 'Incidents', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ pagerduty }, data) => {
  return await pagerduty.request('GET', `incidents/${data.id}`) as Output
  },
})

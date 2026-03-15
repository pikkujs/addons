import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IncidentsListInput = z.object({
  status: z.array(z.string()).optional().describe('Filter by statuses (triggered, acknowledged, resolved)'),
  urgency: z.array(z.string()).optional().describe('Filter by urgencies (high, low)'),
  serviceIds: z.array(z.string()).optional().describe('Filter by service IDs'),
  since: z.string().optional().describe('Start date (ISO 8601)'),
  until: z.string().optional().describe('End date (ISO 8601)'),
  limit: z.number().optional().describe('Max results'),
  offset: z.number().optional().describe('Offset for pagination'),
})

export const IncidentsListOutput = z.object({
  incidents: z.array(z.object({
    id: z.string(),
    incident_number: z.number().optional(),
    title: z.string(),
    status: z.string(),
    urgency: z.string().optional(),
    created_at: z.string().optional(),
    html_url: z.string().optional(),
    service: z.object({
      id: z.string(),
      summary: z.string(),
    }).optional(),
  })),
  limit: z.number().optional(),
  offset: z.number().optional(),
  total: z.number().optional(),
  more: z.boolean().optional(),
})

type Output = z.infer<typeof IncidentsListOutput>

export const incidentsList = pikkuSessionlessFunc({
  description: 'List PagerDuty incidents',
  node: { displayName: 'List Incidents', category: 'Incidents', type: 'action' },
  input: IncidentsListInput,
  output: IncidentsListOutput,
  func: async ({ pagerduty }, data) => {
  const qs: Record<string, string | number | boolean | undefined> = {
    limit: data.limit,
    offset: data.offset,
    since: data.since,
    until: data.until,
  }
  if (data.status) qs['statuses[]'] = data.status.join(',')
  if (data.urgency) qs['urgencies[]'] = data.urgency.join(',')
  if (data.serviceIds) qs['service_ids[]'] = data.serviceIds.join(',')
  return await pagerduty.request('GET', 'incidents', { qs }) as Output
  },
})

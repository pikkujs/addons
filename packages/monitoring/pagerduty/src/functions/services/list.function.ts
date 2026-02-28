import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const inputSchema = z.object({
  query: z.string().optional().describe('Search query'),
  limit: z.number().optional().describe('Max results'),
  offset: z.number().optional().describe('Offset for pagination'),
})

const outputSchema = z.object({
  services: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable().optional(),
    status: z.string().optional(),
    created_at: z.string().optional(),
    html_url: z.string().optional(),
  })),
  limit: z.number().optional(),
  offset: z.number().optional(),
  total: z.number().optional(),
  more: z.boolean().optional(),
})

type Output = z.infer<typeof outputSchema>

export const servicesList = pikkuSessionlessFunc({
  description: 'List PagerDuty services',
  node: { displayName: 'List Services', category: 'Services', type: 'action' },
  input: inputSchema,
  output: outputSchema,
  func: async ({ pagerduty }, data) => {
  return await pagerduty.request('GET', 'services', { qs: data as Record<string, string | number | undefined> }) as Output
  },
})

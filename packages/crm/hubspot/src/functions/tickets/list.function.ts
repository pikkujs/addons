import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TicketListInput = z.object({
  limit: z.number().optional().default(10),
  after: z.string().optional(),
  properties: z.array(z.string()).optional(),
})

export const TicketListOutput = z.object({
  results: z.array(z.object({
    id: z.string(),
    properties: z.record(z.string(), z.any()),
    createdAt: z.string(),
    updatedAt: z.string(),
  })),
  paging: z.object({
    next: z.object({ after: z.string() }).optional(),
  }).optional(),
})

export const ticketList = pikkuSessionlessFunc({
  description: 'Lists all HubSpot tickets',
  node: { displayName: 'List Tickets', category: 'Tickets', type: 'action' },
  input: TicketListInput,
  output: TicketListOutput,
  func: async ({ hubspot }, { limit, after, properties }) => {
    const qs: Record<string, string | number | undefined> = { limit }
    if (after) qs.after = after
    if (properties?.length) qs.properties = properties.join(',')

    return hubspot.request<z.infer<typeof TicketListOutput>>(
      'GET',
      '/crm/v3/objects/tickets',
      { qs }
    )
  },
})

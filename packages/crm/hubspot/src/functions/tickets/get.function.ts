import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TicketGetInput = z.object({
  ticketId: z.string(),
  properties: z.array(z.string()).optional(),
})

export const TicketGetOutput = z.object({
  id: z.string(),
  properties: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const ticketGet = pikkuSessionlessFunc({
  description: 'Gets a HubSpot ticket by ID',
  node: { displayName: 'Get Ticket', category: 'Tickets', type: 'action' },
  input: TicketGetInput,
  output: TicketGetOutput,
  func: async ({ hubspot }, { ticketId, properties }) => {
    const qs: Record<string, string | undefined> = {}
    if (properties?.length) {
      qs.properties = properties.join(',')
    }
    return hubspot.request<z.infer<typeof TicketGetOutput>>(
      'GET',
      `/crm/v3/objects/tickets/${ticketId}`,
      { qs }
    )
  },
})

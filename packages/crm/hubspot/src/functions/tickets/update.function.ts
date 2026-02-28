import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TicketUpdateInput = z.object({
  ticketId: z.string(),
  properties: z.record(z.string(), z.string()),
})

export const TicketUpdateOutput = z.object({
  id: z.string(),
  properties: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const ticketUpdate = pikkuSessionlessFunc({
  description: 'Updates a HubSpot ticket',
  node: { displayName: 'Update Ticket', category: 'Tickets', type: 'action' },
  input: TicketUpdateInput,
  output: TicketUpdateOutput,
  func: async ({ hubspot }, { ticketId, properties }) => {
    return hubspot.request<z.infer<typeof TicketUpdateOutput>>(
      'PATCH',
      `/crm/v3/objects/tickets/${ticketId}`,
      { body: { properties } }
    )
  },
})

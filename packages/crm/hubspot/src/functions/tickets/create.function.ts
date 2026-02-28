import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TicketCreateInput = z.object({
  properties: z.record(z.string(), z.string()),
})

export const TicketCreateOutput = z.object({
  id: z.string(),
  properties: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const ticketCreate = pikkuSessionlessFunc({
  description: 'Creates a new HubSpot ticket',
  node: { displayName: 'Create Ticket', category: 'Tickets', type: 'action' },
  input: TicketCreateInput,
  output: TicketCreateOutput,
  func: async ({ hubspot }, { properties }) => {
    return hubspot.request<z.infer<typeof TicketCreateOutput>>(
      'POST',
      '/crm/v3/objects/tickets',
      { body: { properties } }
    )
  },
})

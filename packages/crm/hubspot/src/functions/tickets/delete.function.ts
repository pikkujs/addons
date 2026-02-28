import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TicketDeleteInput = z.object({
  ticketId: z.string(),
})

export const TicketDeleteOutput = z.object({
  success: z.boolean(),
})

export const ticketDelete = pikkuSessionlessFunc({
  description: 'Deletes (archives) a HubSpot ticket',
  node: { displayName: 'Delete Ticket', category: 'Tickets', type: 'action' },
  input: TicketDeleteInput,
  output: TicketDeleteOutput,
  func: async ({ hubspot }, { ticketId }) => {
    await hubspot.request('DELETE', `/crm/v3/objects/tickets/${ticketId}`)
    return { success: true }
  },
})

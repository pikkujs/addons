import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RestoreDeletedTicketInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const RestoreDeletedTicketOutput = z.string().describe("Empty response")

export const restoreDeletedTicket = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: RestoreDeletedTicketInput,
  output: RestoreDeletedTicketOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/deleted_tickets/{ticket_id}/restore", data) as any
  },
})

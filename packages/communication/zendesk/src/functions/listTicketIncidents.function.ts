import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListTicketIncidentsInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const ListTicketIncidentsOutput = z.record(z.string(), z.unknown())

export const listTicketIncidents = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents\n\n#### Pagination\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).",
  input: ListTicketIncidentsInput,
  output: ListTicketIncidentsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/incidents", data) as any
  },
})

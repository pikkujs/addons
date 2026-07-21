import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListTicketCollaboratorsInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const ListTicketCollaboratorsOutput = z.record(z.string(), z.unknown())

export const listTicketCollaborators = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: ListTicketCollaboratorsInput,
  output: ListTicketCollaboratorsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/collaborators", data) as any
  },
})

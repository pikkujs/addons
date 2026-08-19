import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteTagsTicketInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
  tags: z.string().optional().describe("Comma-separated list of tags to remove from the ticket."),
})

export const DeleteTagsTicketOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const deleteTagsTicket = pikkuSessionlessFunc({
  description: "You can also delete tags from multiple tickets with the\n[Update Many Tickets](/api-reference/ticketing/tickets/tickets/#update-many-tickets) endpoint.\n\nThis endpoint supports safe updates. See [Safe Update](/api-reference/ticketing/ticket-management/tags/#safe-update).\n\n#### Allowed For\n\n* Agents",
  input: DeleteTagsTicketInput,
  output: DeleteTagsTicketOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/tickets/{ticket_id}/tags", data) as any
  },
})

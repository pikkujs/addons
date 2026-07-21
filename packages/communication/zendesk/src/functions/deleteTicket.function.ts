import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteTicketInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const deleteTicket = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins\n* Agents with permission to delete tickets\n\nAgent delete permissions are set in Support. See\n[Deleting tickets](https://support.zendesk.com/hc/en-us/articles/4408883872538)\nin the Support Help Center.\n\n#### Ticket deletion rate limit\n\nYou can delete 400 tickets every 1 minute using this endpoint.\nThe rate limiting mechanism behaves as described in\n[Rate limits](/api-reference/introduction/rate-limits/) in the API introduction.\nZendesk recommends that you obey the Retry-After header values.\nTo delete many tickets, you may use [Bulk Delete Tickets](/api-reference/ticketing/tickets/tickets/#bulk-delete-tickets).",
  input: DeleteTicketInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/tickets/{ticket_id}", data)
  },
})

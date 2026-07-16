import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteTicketFormStatusesInput = z.object({
  ticket_form_id: z.number().int().describe("The ID of the ticket form. Example: 47"),
  id: z.array(z.string()).optional().describe("List of ids to delete"),
})

export const deleteTicketFormStatuses = pikkuSessionlessFunc({
  description: "Deletes all of of the ticket form statuses by id.\n\n#### Allowed For\n\n* Admins\n* Agents",
  input: DeleteTicketFormStatusesInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/ticket_forms/{ticket_form_id}/ticket_form_statuses", data)
  },
})

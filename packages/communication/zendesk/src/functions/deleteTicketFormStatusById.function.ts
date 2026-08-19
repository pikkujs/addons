import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteTicketFormStatusByIdInput = z.object({
  ticket_form_id: z.number().int().describe("The ID of the ticket form. Example: 47"),
  ticket_form_status_id: z.string().describe("The id of the ticket form status. Example: \"abcdef\""),
})

export const deleteTicketFormStatusById = pikkuSessionlessFunc({
  description: "Deletes a ticket form status by id.\n\n#### Allowed For\n\n* Admins",
  input: DeleteTicketFormStatusByIdInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/ticket_forms/{ticket_form_id}/ticket_form_statuses/{ticket_form_status_id}", data)
  },
})

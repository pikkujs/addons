import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteTicketFormInput = z.object({
  ticket_form_id: z.number().int().describe("The ID of the ticket form. Example: 47"),
})

export const deleteTicketForm = pikkuSessionlessFunc({
  description: "#### Allowed For\n* Admins",
  input: DeleteTicketFormInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/ticket_forms/{ticket_form_id}", data)
  },
})

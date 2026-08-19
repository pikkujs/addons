import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteTicketFieldOptionInput = z.object({
  ticket_field_id: z.number().int().describe("The ID of the ticket field. Example: 34"),
  ticket_field_option_id: z.number().int().describe("The ID of the ticket field option. Example: 10001"),
})

export const deleteTicketFieldOption = pikkuSessionlessFunc({
  description: "#### Allowed for\n* Admins",
  input: DeleteTicketFieldOptionInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/ticket_fields/{ticket_field_id}/options/{ticket_field_option_id}", data)
  },
})

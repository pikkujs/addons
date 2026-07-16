import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteTicketFieldInput = z.object({
  ticket_field_id: z.number().int().describe("The ID of the ticket field. Example: 34"),
  creator: z.boolean().optional().describe("If true, displays the `creator_user_id` and `creator_app_name` properties. If the ticket field is created\n by an app, `creator_app_name` is the name of the app and `creator_user_id` is `-1`. If the ticket field\n is not created by an app, then `creator_app_name` is null\n"),
})

export const deleteTicketField = pikkuSessionlessFunc({
  description: "#### Allowed for\n\n* Admins",
  input: DeleteTicketFieldInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/ticket_fields/{ticket_field_id}", data)
  },
})

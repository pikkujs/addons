import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteSuspendedTicketInput = z.object({
  id: z.number().int().describe("id of the suspended ticket. Example: 35436"),
})

export const deleteSuspendedTicket = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Unrestricted agents",
  input: DeleteSuspendedTicketInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/suspended_tickets/{id}", data)
  },
})

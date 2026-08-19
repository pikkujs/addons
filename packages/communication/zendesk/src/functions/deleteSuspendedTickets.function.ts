import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteSuspendedTicketsInput = z.object({
  ids: z.string().describe("A comma separated list of ids of suspended tickets to delete.. Example: \"94,141\""),
})

export const deleteSuspendedTickets = pikkuSessionlessFunc({
  description: "Accepts up to 100 ids (the auto-generated id, not the ticket id.)\n\n#### Allowed For\n\n* Admins and [agents in custom roles with permission](https://support.zendesk.com/hc/en-us/articles/4408882153882#topic_cxn_hig_bd) to manage suspended tickets on Enterprise plans\n* Unrestricted agents on all other plans",
  input: DeleteSuspendedTicketsInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/suspended_tickets/destroy_many", data)
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MarkTicketAsSpamAndSuspendRequesterInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const MarkTicketAsSpamAndSuspendRequesterOutput = z.string()

export const markTicketAsSpamAndSuspendRequester = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: MarkTicketAsSpamAndSuspendRequesterInput,
  output: MarkTicketAsSpamAndSuspendRequesterOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/tickets/{ticket_id}/mark_as_spam", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MakeTicketCommentPrivateInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
  ticket_comment_id: z.number().int().describe("The ID of the ticket comment. Example: 35436"),
})

export const MakeTicketCommentPrivateOutput = z.string().describe("Empty response")

export const makeTicketCommentPrivate = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: MakeTicketCommentPrivateInput,
  output: MakeTicketCommentPrivateOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/tickets/{ticket_id}/comments/{ticket_comment_id}/make_private", data) as any
  },
})

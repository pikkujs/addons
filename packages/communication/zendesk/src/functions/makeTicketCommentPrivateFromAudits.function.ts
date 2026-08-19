import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MakeTicketCommentPrivateFromAuditsInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
  ticket_audit_id: z.number().int().describe("The ID of the ticket audit. Example: 2127301143"),
})

export const MakeTicketCommentPrivateFromAuditsOutput = z.string().describe("Empty response")

export const makeTicketCommentPrivateFromAudits = pikkuSessionlessFunc({
  description: "#### Allowed for\n\n* Agents",
  input: MakeTicketCommentPrivateFromAuditsInput,
  output: MakeTicketCommentPrivateFromAuditsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/tickets/{ticket_id}/audits/{ticket_audit_id}/make_private", data) as any
  },
})

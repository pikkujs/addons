import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListTicketEmailCCsInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const ListTicketEmailCCsOutput = z.record(z.string(), z.unknown())

export const listTicketEmailCCs = pikkuSessionlessFunc({
  description: "Returns any users cc'd on the ticket.\n\n#### Availability\n\nThe [CCs and Followers](https://support.zendesk.com/hc/en-us/articles/4408822451482) feature must be enabled in Zendesk Support.\n\nIf the feature is not enabled, the default CC functionality is used. In that case, use [List Collaborators](/api-reference/ticketing/tickets/tickets/#list-collaborators-for-a-ticket) to list the users cc'ed on the ticket.\n\n#### Allowed For\n\n* Agents",
  input: ListTicketEmailCCsInput,
  output: ListTicketEmailCCsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/email_ccs", data) as any
  },
})

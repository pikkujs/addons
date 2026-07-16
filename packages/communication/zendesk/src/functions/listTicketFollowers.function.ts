import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListTicketFollowersInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const ListTicketFollowersOutput = z.record(z.string(), z.unknown())

export const listTicketFollowers = pikkuSessionlessFunc({
  description: "Returns any users who follow the ticket.\n\n#### Availability\n\nThe [CCs and Followers](https://support.zendesk.com/hc/en-us/articles/4408822451482) feature must be enabled in Zendesk Support.\n\n#### Allowed For\n\n* Agents",
  input: ListTicketFollowersInput,
  output: ListTicketFollowersOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/followers", data) as any
  },
})

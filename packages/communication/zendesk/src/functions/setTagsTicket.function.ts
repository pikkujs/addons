import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SetTagsTicketInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const SetTagsTicketOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const setTagsTicket = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: SetTagsTicketInput,
  output: SetTagsTicketOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/tickets/{ticket_id}/tags", data) as any
  },
})

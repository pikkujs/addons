import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CountTicketCommentsInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
})

export const CountTicketCommentsOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countTicketComments = pikkuSessionlessFunc({
  description: "Returns an approximate count of the comments added to the ticket. If the count exceeds 100,000, the count will return a cached result.  This cached result will update every 24 hours.\n\nThe `count[refreshed_at]` property is a timestamp that indicates when the count was last updated.\n\n**Note**: When the count exceeds 100,000, `count[refreshed_at]` may occasionally be null.\nThis indicates that the count is being updated in the background, and `count[value]` is limited to 100,000 until the update is complete.\n\n#### Allowed For\n* Agents",
  input: CountTicketCommentsInput,
  output: CountTicketCommentsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/comments/count", data) as any
  },
})

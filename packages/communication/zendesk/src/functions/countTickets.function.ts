import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CountTicketsOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countTickets = pikkuSessionlessFunc({
  description: "Returns an approximate count of tickets in the account. If the count exceeds 100,000, it is updated every 24 hours.\n\n`ccd` lists tickets that the specified user is cc'd on.\n\nThe `count[refreshed_at]` property is a timestamp that indicates when the count was last updated.\n\n**Note**: When the count exceeds 100,000, `count[refreshed_at]` may occasionally be null.\nThis indicates that the count is being updated in the background, and `count[value]` is limited to 100,000 until the update is complete.\n\n#### Allowed For\n* Agents",
  output: CountTicketsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/tickets/count") as any
  },
})

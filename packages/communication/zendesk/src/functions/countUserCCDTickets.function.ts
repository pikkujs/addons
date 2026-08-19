import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CountUserCCDTicketsInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const CountUserCCDTicketsOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countUserCCDTickets = pikkuSessionlessFunc({
  description: "Returns an approximate count of tickets where the specified user is CC'd. If the count exceeds 100,000, it is updated every 24 hours.\n\nThe `count[refreshed_at]` property is a timestamp that indicates when the count was last updated.\n\n**Note**: When the count exceeds 100,000, `count[refreshed_at]` may occasionally be null.\nThis indicates that the count is being updated in the background, and `count[value]` is limited to 100,000 until the update is complete.\n\n#### Allowed For\n* Agents",
  input: CountUserCCDTicketsInput,
  output: CountUserCCDTicketsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/tickets/ccd/count", data) as any
  },
})

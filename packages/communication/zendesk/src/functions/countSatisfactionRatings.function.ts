import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CountSatisfactionRatingsOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countSatisfactionRatings = pikkuSessionlessFunc({
  description: "Returns an approximate count of satisfaction ratings in the account. If the count exceeds 100,000, the count will return a cached result. This cached result will update every 24 hours.\n\nThe `count[refreshed_at]` property is a timestamp that indicates when the count was last updated.\n\n**Note**: When the count exceeds 100,000, `count[refreshed_at]` may occasionally be null.\nThis indicates that the count is being updated in the background, and `count[value]` is limited to 100,000 until the update is complete.\n\n#### Allowed For\n* Admins",
  output: CountSatisfactionRatingsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/satisfaction_ratings/count") as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CountViewsOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countViews = pikkuSessionlessFunc({
  description: "Returns an approximate count of shared and personal views available to the current user. If the count exceeds 100,000, the count will return a cached result.  This cached result will update every 24 hours.\n\nThe `count[refreshed_at]` property is a timestamp that indicates when the count was last updated.\n\n**Note**: When the count exceeds 100,000, `count[refreshed_at]` may occasionally be null.\nThis indicates that the count is being updated in the background, and `count[value]` is limited to 100,000 until the update is complete.\n\n#### Allowed For\n* Agents",
  output: CountViewsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/views/count") as any
  },
})

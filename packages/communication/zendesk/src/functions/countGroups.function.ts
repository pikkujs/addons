import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CountGroupsOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional().describe("Timestamp that indicates when the count was last updated"),
    value: z.number().int().optional().describe("Approximate count of groups"),
  }).optional(),
})

export const countGroups = pikkuSessionlessFunc({
  description: "Returns an approximate count of groups. If the count exceeds 100,000, it is updated every 24 hours.\n\nThe `refreshed_at` property of the `count` object is a timestamp that indicates when the count was last updated.\n\n**Note**: When the count exceeds 100,000, `refreshed_at` may occasionally be null. This indicates that the count is being updated in the background, and the `value` property of the `count` object is limited to 100,000 until the update is complete.\n\n#### Allowed For\n\n* Admins\n* Agents",
  output: CountGroupsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/groups/count") as any
  },
})

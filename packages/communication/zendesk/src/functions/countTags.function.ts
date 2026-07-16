import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CountTagsOutput = z.object({
  count: z.object({
    refreshed_at: z.string().optional().describe("The time that the count value was last refreshed"),
    value: z.number().int().optional().describe("The count of tags created in the last 24 hours"),
  }).optional(),
})

export const countTags = pikkuSessionlessFunc({
  description: "Returns an approximate count of tags. If the count exceeds 100,000, it\nis updated every 24 hours.\n\nThe `refreshed_at` property of the `count` object is a timestamp that indicates when\nthe count was last updated.\n\n**Note**: When the count exceeds 100,000, the `refreshed_at` property in the `count` object may\noccasionally be null. This indicates that the count is being\nupdated in the background and the `value` property in the `count` object is limited to\n100,000 until the update is complete.\n\n#### Allowed For\n\n* Agents",
  output: CountTagsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/tags/count") as any
  },
})

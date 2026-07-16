import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CountDeletedUsersOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countDeletedUsers = pikkuSessionlessFunc({
  description: "Returns an approximate count of deleted users, including permanently deleted users. If the count exceeds 100,000, it is updated every 24 hours.\n\nThe response includes a `refreshed_at` property in a `count` object that contains a timestamp indicating when the count was last updated.\n\n**Note**: When the count exceeds 100,000, `count[refreshed_at]` may occasionally be null.\nThis indicates that the count is being updated in the background, and `count[value]` is limited to 100,000 until the update is complete.\n\n#### Allowed For\n\n* Agents",
  output: CountDeletedUsersOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/deleted_users/count") as any
  },
})

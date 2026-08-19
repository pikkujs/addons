import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CountTicketFieldsOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countTicketFields = pikkuSessionlessFunc({
  description: "Returns an approximate count of system and custom ticket fields in the account. If the count exceeds 100,000, the count will return a cached result.  This cached result will update every 24 hours.\n\nThe `count[refreshed_at]` property is a timestamp that indicates when the count was last updated.\n\n**Note**: When the count exceeds 100,000, `count[refreshed_at]` may occasionally be null.\nThis indicates that the count is being updated in the background, and `count[value]` is limited to 100,000 until the update is complete.\n\n#### Allowed For\n* Agents",
  output: CountTicketFieldsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/ticket_fields/count") as any
  },
})

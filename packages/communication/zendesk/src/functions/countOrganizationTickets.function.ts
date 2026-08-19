import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CountOrganizationTicketsInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
})

export const CountOrganizationTicketsOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countOrganizationTickets = pikkuSessionlessFunc({
  description: "Returns an approximate count of tickets for a specific organization. If the count exceeds 100,000, it is updated every 24 hours.\n\nThe `count[refreshed_at]` property is a timestamp that indicates when the count was last updated.\n\n**Note**: When the count exceeds 100,000, `count[refreshed_at]` may occasionally be null.\nThis indicates that the count is being updated in the background, and `count[value]` is limited to 100,000 until the update is complete.\n\n#### Allowed For\n* Agents",
  input: CountOrganizationTicketsInput,
  output: CountOrganizationTicketsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organizations/{organization_id}/tickets/count", data) as any
  },
})

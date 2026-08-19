import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CountOrganizationsInput = z.object({
  include_boundary_indicators: z.boolean().optional().describe("When true, includes `has_more` indicator in the cursor pagination response meta.\n\nOnly valid with cursor pagination (page[size], page[after], page[before]).\n"),
  include_item_cursors: z.boolean().optional().describe("When true, includes cursor values for each item in the cursor pagination response.\n\nOnly valid with cursor pagination (page[size], page[after], page[before]).\n"),
})

export const CountOrganizationsOutput = z.object({
  count: z.object({
    refreshed_at: z.string().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countOrganizations = pikkuSessionlessFunc({
  description: "Returns an approximate count of organizations. If the count exceeds\n100,000, it is updated every 24 hours.\n\nThe `refreshed_at` property of the `count` object is a timestamp that indicates\nwhen the count was last updated.\n\nWhen the count exceeds 100,000, the `refreshed_at` property may\noccasionally be null. This indicates that the count is being\nupdated in the background and the `value` property of the `count` object is limited to\n100,000 until the update is complete.\n\n#### Allowed For\n\n* Agents",
  input: CountOrganizationsInput,
  output: CountOrganizationsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organizations/count", data) as any
  },
})

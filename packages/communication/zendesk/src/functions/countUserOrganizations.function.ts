import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CountUserOrganizationsInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const CountUserOrganizationsOutput = z.object({
  count: z.object({
    refreshed_at: z.string().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countUserOrganizations = pikkuSessionlessFunc({
  description: "Returns an approximate count of organizations for a specific user. If the count exceeds\n100,000, it is updated every 24 hours.\n\nThe `refreshed_at` property of the `count` object is a timestamp that indicates\nwhen the count was last updated.\n\nWhen the count exceeds 100,000, the `refreshed_at` property may\noccasionally be null. This indicates that the count is being\nupdated in the background and the `value` property of the `count` object is limited to\n100,000 until the update is complete.\n\n#### Allowed For\n\n* Agents",
  input: CountUserOrganizationsInput,
  output: CountUserOrganizationsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/organizations/count", data) as any
  },
})

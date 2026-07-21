import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CountUsersInput = z.object({
  role: z.string().optional().describe("Filters the results by role. Possible values are \"end-user\", \"agent\", \"admin\", or a custom role name\n. Example: \"agent\""),
  "role[]": z.array(z.string()).optional().describe("Filters the results by more than one role using the format `role[]={role}&role[]={role}`\n. Example: [\"agent\",\"admin\"]"),
  permission_set: z.number().int().optional().describe("For custom roles which is available on the Enterprise plan and above. You can only filter by one role ID per request. Example: 123"),
  brand_id: z.union([z.literal("all"), z.number().int()]).optional().describe("When brand separation is enabled, scopes the count to users belonging to\nthe specified brand. Only applicable when the account has brand separation enabled.\n\nAccepted values:\n\n* \"all\" — count all users across all brands (no brand filtering applied).\n* 0 — count only account-scoped (brand-less) users.\n* A numeric brand id — if the brand has user separation enabled, count\n  end users belonging to that brand plus all agents and admins (who are\n  account-level and always included). If the brand does not have user\n  separation enabled, the request falls back to account scope (0).\n. Example: \"all\""),
})

export const CountUsersOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countUsers = pikkuSessionlessFunc({
  description: "Returns an approximate count of users. If the count exceeds 100,000, it is updated every 24 hours.\n\nThe response includes a `refreshed_at` property in a `count` object that contains a timestamp indicating when the count was last updated.\n\n**Note**: When the count exceeds 100,000, the `refreshed_at` property may occasionally be null.\nThis indicates that the count is being updated in the background. The `count` object's `value` property is limited to 100,000 until the update is complete.\n\n#### Allowed For\n\n* Admins, Agents and Light Agents",
  input: CountUsersInput,
  output: CountUsersOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/count", data) as any
  },
})

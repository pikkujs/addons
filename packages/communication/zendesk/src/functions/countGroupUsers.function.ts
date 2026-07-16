import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CountGroupUsersInput = z.object({
  group_id: z.number().int().describe("The ID of the group. Example: 122"),
  role: z.string().optional().describe("Filters the results by role. Possible values are \"end-user\", \"agent\", \"admin\", or a custom role name\n. Example: \"agent\""),
  "role[]": z.array(z.string()).optional().describe("Filters the results by more than one role using the format `role[]={role}&role[]={role}`\n. Example: [\"agent\",\"admin\"]"),
  permission_set: z.number().int().optional().describe("For custom roles which is available on the Enterprise plan and above. You can only filter by one role ID per request. Example: 123"),
})

export const CountGroupUsersOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countGroupUsers = pikkuSessionlessFunc({
  description: "Returns an approximate count of users in the specified group. If the count exceeds 100,000, it is updated every 24 hours.\n\nThe response includes a `refreshed_at` property in a `count` object that contains a timestamp indicating when the count was last updated.\n\n**Note**: When the count exceeds 100,000, the `refreshed_at` property may occasionally be null.\nThis indicates that the count is being updated in the background. The `count` object's `value` property is limited to 100,000 until the update is complete.\n\n#### Allowed For\n\n* Admins, Agents and Light Agents",
  input: CountGroupUsersInput,
  output: CountGroupUsersOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/groups/{group_id}/users/count", data) as any
  },
})

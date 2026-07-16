import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CountOrganizationUsersInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
  role: z.string().optional().describe("Filters the results by role. Possible values are \"end-user\", \"agent\", \"admin\", or a custom role name\n. Example: \"agent\""),
  "role[]": z.array(z.string()).optional().describe("Filters the results by more than one role using the format `role[]={role}&role[]={role}`\n. Example: [\"agent\",\"admin\"]"),
  permission_set: z.number().int().optional().describe("For custom roles which is available on the Enterprise plan and above. You can only filter by one role ID per request. Example: 123"),
})

export const CountOrganizationUsersOutput = z.object({
  count: z.object({
    refreshed_at: z.string().datetime().optional(),
    value: z.number().int().optional(),
  }).optional(),
})

export const countOrganizationUsers = pikkuSessionlessFunc({
  description: "Returns an approximate count of users for a specific organization. If the count exceeds 100,000, it is updated every 24 hours.\n\nThe response includes a `refreshed_at` property in a `count` object that contains a timestamp indicating when the count was last updated.\n\n**Note**: When the count exceeds 100,000, the `refreshed_at` property may occasionally be null.\nThis indicates that the count is being updated in the background. The `count` object's `value` property is limited to 100,000 until the update is complete.\n\n#### Allowed For\n\n* Admins, Agents and Light Agents",
  input: CountOrganizationUsersInput,
  output: CountOrganizationUsersOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organizations/{organization_id}/users/count", data) as any
  },
})

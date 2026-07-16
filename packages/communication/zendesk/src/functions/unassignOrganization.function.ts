import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UnassignOrganizationInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const unassignOrganization = pikkuSessionlessFunc({
  description: "Immediately removes a user from an organization and schedules a job to unassign all working tickets currently assigned to the user and organization combination. The `organization_id` of the unassigned tickets is set to null.\n\n#### Allowed For\n\n* Agents",
  input: UnassignOrganizationInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/users/{user_id}/organizations/{organization_id}", data)
  },
})

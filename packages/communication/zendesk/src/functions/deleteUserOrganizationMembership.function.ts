import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteUserOrganizationMembershipInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  organization_membership_id: z.number().int().describe("The ID of the organization membership. Example: 4"),
})

export const deleteUserOrganizationMembership = pikkuSessionlessFunc({
  description: "Immediately removes a user from an organization and schedules a job to unassign all working tickets currently assigned to the user and organization combination. The `organization_id` of the unassigned tickets is set to null.\n\n#### Allowed for\n\n* Admins\n* Agents when deleting an organization membership for an end user",
  input: DeleteUserOrganizationMembershipInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/users/{user_id}/organization_memberships/{organization_membership_id}", data)
  },
})

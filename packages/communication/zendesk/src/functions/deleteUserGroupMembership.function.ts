import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteUserGroupMembershipInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  group_membership_id: z.number().int().describe("The ID of the group membership. Example: 4"),
})

export const deleteUserGroupMembership = pikkuSessionlessFunc({
  description: "Immediately removes a user from a group and schedules a job to unassign all working tickets that are assigned to the given user and group combination.\n\n#### Allowed For\n\n* Admins\n* Agents assigned to a custom role with permissions to manage group memberships (Enterprise only)",
  input: DeleteUserGroupMembershipInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/users/{user_id}/group_memberships/{group_membership_id}", data)
  },
})

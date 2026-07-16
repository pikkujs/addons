import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteGroupMembershipInput = z.object({
  group_membership_id: z.number().int().describe("The ID of the group membership. Example: 4"),
})

export const deleteGroupMembership = pikkuSessionlessFunc({
  description: "Immediately removes a user from a group and schedules a job to unassign all working tickets that are assigned to the given user and group combination.\n\n#### Allowed For\n\n* Admins\n* Agents assigned to a custom role with permissions to manage group memberships (Enterprise only)",
  input: DeleteGroupMembershipInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/group_memberships/{group_membership_id}", data)
  },
})

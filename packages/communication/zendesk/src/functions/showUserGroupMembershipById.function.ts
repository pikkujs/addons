import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowUserGroupMembershipByIdInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  group_membership_id: z.number().int().describe("The ID of the group membership. Example: 4"),
})

export const ShowUserGroupMembershipByIdOutput = z.object({
  group_membership: z.object({
    created_at: z.string().datetime().optional().describe("The time the group was created"),
    default: z.boolean().optional().describe("If true, tickets assigned directly to the agent will assume this membership's group"),
    group_id: z.number().int().describe("The id of a group"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the group"),
    url: z.string().optional().describe("The API url of this record"),
    user_id: z.number().int().describe("The id of an agent"),
  }).optional(),
})

export const showUserGroupMembershipById = pikkuSessionlessFunc({
  description: "Returns a specific group membership for a user.\n\n#### Allowed For\n\n* Agents",
  input: ShowUserGroupMembershipByIdInput,
  output: ShowUserGroupMembershipByIdOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/group_memberships/{group_membership_id}", data) as any
  },
})

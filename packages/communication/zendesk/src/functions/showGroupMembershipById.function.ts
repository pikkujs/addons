import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowGroupMembershipByIdInput = z.object({
  group_membership_id: z.number().int().describe("The ID of the group membership. Example: 4"),
})

export const ShowGroupMembershipByIdOutput = z.object({
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

export const showGroupMembershipById = pikkuSessionlessFunc({
  description: "The 'id' is the group membership id, not a group id.\n\n#### Allowed For\n\n* Agents",
  input: ShowGroupMembershipByIdInput,
  output: ShowGroupMembershipByIdOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/group_memberships/{group_membership_id}", data) as any
  },
})

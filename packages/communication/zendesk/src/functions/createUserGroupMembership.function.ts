import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateUserGroupMembershipInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  group_membership: z.object({
  default: z.boolean().optional().describe("If true, tickets assigned directly to the agent will assume this membership's group"),
  group_id: z.number().int().describe("The id of a group"),
}).describe("Group membership object. Note that user_id is derived from the URL path parameter and should not be included in the request body"),
})

export const CreateUserGroupMembershipOutput = z.object({
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

export const createUserGroupMembership = pikkuSessionlessFunc({
  description: "Assigns an agent to a given group.\n\n#### Allowed For\n\n* Admins\n* Agents assigned to a custom role with permissions to manage group memberships (Enterprise only)",
  input: CreateUserGroupMembershipInput,
  output: CreateUserGroupMembershipOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/users/{user_id}/group_memberships", data) as any
  },
})

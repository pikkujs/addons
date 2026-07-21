import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListAssignableGroupMembershipsByGroupInput = z.object({
  group_id: z.number().int().describe("The ID of the group. Example: 122"),
})

export const ListAssignableGroupMembershipsByGroupOutput = z.object({
  group_memberships: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time the group was created"),
    default: z.boolean().optional().describe("If true, tickets assigned directly to the agent will assume this membership's group"),
    group_id: z.number().int().describe("The id of a group"),
    id: z.number().int().optional().describe("Automatically assigned upon creation"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the group"),
    url: z.string().optional().describe("The API url of this record"),
    user_id: z.number().int().describe("The id of an agent"),
  })).optional(),
})

export const listAssignableGroupMembershipsByGroup = pikkuSessionlessFunc({
  description: "Returns a list of assignable group memberships for a specific group.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For:\n\n* Agents",
  input: ListAssignableGroupMembershipsByGroupInput,
  output: ListAssignableGroupMembershipsByGroupOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/groups/{group_id}/memberships/assignable", data) as any
  },
})

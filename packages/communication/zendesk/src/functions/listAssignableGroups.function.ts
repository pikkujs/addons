import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListAssignableGroupsOutput = z.object({
  groups: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time the group was created"),
    default: z.boolean().optional().describe("If the group is the default one for the account"),
    deleted: z.boolean().optional().describe("Deleted groups get marked as such"),
    description: z.string().optional().describe("The description of the group"),
    id: z.number().int().optional().describe("Automatically assigned when creating groups"),
    is_public: z.boolean().optional().describe("If true, the group is public.\nIf false, the group is private.\nYou can't change a private group to a public group\n"),
    name: z.string().describe("The name of the group"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the group"),
    url: z.string().optional().describe("The API url of the group"),
  })).optional(),
})

export const listAssignableGroups = pikkuSessionlessFunc({
  description: "#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Admins\n* Agents",
  output: ListAssignableGroupsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/groups/assignable") as any
  },
})

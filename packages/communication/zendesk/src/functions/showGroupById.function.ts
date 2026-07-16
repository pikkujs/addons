import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowGroupByIdInput = z.object({
  group_id: z.number().int().describe("The ID of the group. Example: 122"),
  include: z.string().optional().describe("Sideloads to include in the response. Accepts a comma-separated list of values.\n. Example: \"users,group_settings\""),
})

export const ShowGroupByIdOutput = z.object({
  group: z.object({
    created_at: z.string().datetime().optional().describe("The time the group was created"),
    default: z.boolean().optional().describe("If the group is the default one for the account"),
    deleted: z.boolean().optional().describe("Deleted groups get marked as such"),
    description: z.string().optional().describe("The description of the group"),
    id: z.number().int().optional().describe("Automatically assigned when creating groups"),
    is_public: z.boolean().optional().describe("If true, the group is public.\nIf false, the group is private.\nYou can't change a private group to a public group\n"),
    name: z.string().describe("The name of the group"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the group"),
    url: z.string().optional().describe("The API url of the group"),
  }).optional(),
})

export const showGroupById = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins\n* Agents",
  input: ShowGroupByIdInput,
  output: ShowGroupByIdOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/groups/{group_id}", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateGroupInput = z.object({
  group: z.object({
  description: z.string().optional().describe("The description of the group"),
  is_public: z.boolean().optional().describe("If true, the group is public.\nIf false, the group is private.\nYou can't change a private group to a public group\n"),
  name: z.string().describe("The name of the group"),
}),
})

export const CreateGroupOutput = z.object({
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

export const createGroup = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins\n* Agents assigned to a custom role with permissions to manage groups (Enterprise only)",
  input: CreateGroupInput,
  output: CreateGroupOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/groups", data) as any
  },
})

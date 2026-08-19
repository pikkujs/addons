import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const RemoveOrganizationTagsInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
})

export const RemoveOrganizationTagsOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const removeOrganizationTags = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: RemoveOrganizationTagsInput,
  output: RemoveOrganizationTagsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/organizations/{organization_id}/tags", data) as any
  },
})

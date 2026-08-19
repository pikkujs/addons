import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AddOrganizationTagsInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
})

export const AddOrganizationTagsOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const addOrganizationTags = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: AddOrganizationTagsInput,
  output: AddOrganizationTagsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/organizations/{organization_id}/tags", data) as any
  },
})

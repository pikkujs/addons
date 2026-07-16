import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListOrganizationTagsInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
})

export const ListOrganizationTagsOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const listOrganizationTags = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: ListOrganizationTagsInput,
  output: ListOrganizationTagsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organizations/{organization_id}/tags", data) as any
  },
})

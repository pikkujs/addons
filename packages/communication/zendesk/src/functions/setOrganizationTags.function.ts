import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SetOrganizationTagsInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
})

export const SetOrganizationTagsOutput = z.object({
  tags: z.array(z.string()).describe("An array of strings"),
})

export const setOrganizationTags = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: SetOrganizationTagsInput,
  output: SetOrganizationTagsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/organizations/{organization_id}/tags", data) as any
  },
})

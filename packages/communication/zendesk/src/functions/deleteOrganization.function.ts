import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteOrganizationInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
})

export const deleteOrganization = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins\n* Agents assigned to a custom role with permissions to manage organizations (Enterprise only)",
  input: DeleteOrganizationInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/organizations/{organization_id}", data)
  },
})

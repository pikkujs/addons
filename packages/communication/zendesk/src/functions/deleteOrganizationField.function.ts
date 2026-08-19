import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteOrganizationFieldInput = z.object({
  organization_field_id: z.union([z.number().int(), z.string()]).describe("The ID or key of the organization field. Example: \"my_text_field\""),
})

export const deleteOrganizationField = pikkuSessionlessFunc({
  description: "#### Allowed for\n\n* Admins",
  input: DeleteOrganizationFieldInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/organization_fields/{organization_field_id}", data)
  },
})

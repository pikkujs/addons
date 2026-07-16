import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteCustomRoleByIdInput = z.object({
  custom_role_id: z.number().int().describe("The ID of the custom agent role. Example: 10127"),
})

export const deleteCustomRoleById = pikkuSessionlessFunc({
  description: "#### Availability\n\n* Accounts on the Enterprise plan or above\n\n#### Allowed for\n\n* Administrators\n* Agents with the `manage_roles` permission",
  input: DeleteCustomRoleByIdInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/custom_roles/{custom_role_id}", data)
  },
})

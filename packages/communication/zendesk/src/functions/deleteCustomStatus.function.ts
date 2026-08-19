import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteCustomStatusInput = z.object({
  custom_status_id: z.number().int().describe("The id of the custom status. Example: 1234567"),
})

export const deleteCustomStatus = pikkuSessionlessFunc({
  description: "Deletes the custom ticket status. The status must first be unassigned\nfrom all active (non-closed) tickets before it can be deleted.\n\n#### Allowed For\n\n* Admins",
  input: DeleteCustomStatusInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/custom_statuses/{custom_status_id}", data)
  },
})

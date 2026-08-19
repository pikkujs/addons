import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteSLAPolicyInput = z.object({
  sla_policy_id: z.number().int().describe("The ID of the SLA Policy. Example: 36"),
})

export const deleteSLAPolicy = pikkuSessionlessFunc({
  description: "#### Availability\n\n* Accounts on the Support Professional or Suite Growth plan or above\n\n#### Allowed For\n\n* Admins",
  input: DeleteSLAPolicyInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/slas/policies/{sla_policy_id}", data)
  },
})

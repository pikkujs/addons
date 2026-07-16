import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteGroupSLAPolicyInput = z.object({
  group_sla_policy_id: z.number().int().describe("The id of the Group SLA policy. Example: 36"),
})

export const deleteGroupSLAPolicy = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins",
  input: DeleteGroupSLAPolicyInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/group_slas/policies/{group_sla_policy_id}", data)
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReorderGroupSLAPoliciesInput = z.object({
  group_sla_policy_ids: z.array(z.string()).optional().describe("The ids of the Group SLA policies to reorder"),
})

export const ReorderGroupSLAPoliciesOutput = z.string().describe("Empty response")

export const reorderGroupSLAPolicies = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins",
  input: ReorderGroupSLAPoliciesInput,
  output: ReorderGroupSLAPoliciesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/group_slas/policies/reorder", data) as any
  },
})

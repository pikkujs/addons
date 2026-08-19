import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReorderSLAPoliciesInput = z.object({
  sla_policy_ids: z.array(z.number().int()).optional().describe("The IDs of the SLA Policies to reorder"),
})

export const ReorderSLAPoliciesOutput = z.string().describe("Empty response")

export const reorderSLAPolicies = pikkuSessionlessFunc({
  description: "#### Availability\n\n* Accounts on the Support Professional or Suite Growth plan or above\n\n#### Allowed For\n\n* Admins",
  input: ReorderSLAPoliciesInput,
  output: ReorderSLAPoliciesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/slas/policies/reorder", data) as any
  },
})

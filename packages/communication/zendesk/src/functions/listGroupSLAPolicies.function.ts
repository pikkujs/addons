import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListGroupSLAPoliciesOutput = z.object({
  count: z.number().int().optional(),
  group_sla_policies: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time the Group SLA policy was created"),
    description: z.string().optional().describe("The description of the Group SLA policy"),
    filter: z.object({
      all: z.array(z.object({
        field: z.string().optional().describe("The name of a ticket field"),
        operator: z.string().optional().describe("A comparison operator"),
        value: z.array(z.union([z.string(), z.number().int()])).optional().describe("The value of a ticket field"),
      })).optional(),
    }).describe("An object that describes the conditions a ticket must match for a Group SLA policy to be applied to the ticket. See [Filter](#filter)."),
    id: z.string().optional().describe("Automatically assigned when created"),
    policy_metrics: z.array(z.object({
      business_hours: z.boolean().optional().describe("Whether the metric targets are being measured in business hours or calendar hours"),
      metric: z.string().optional().describe("The definition of the time that is being measured"),
      priority: z.string().optional().describe("Priority that a ticket must match"),
      target: z.number().int().optional().describe("The time within which the end-state for a metric should be met"),
    })).optional().describe("Array of [policy metric](#policy-metric) objects"),
    position: z.number().int().optional().describe("Position of the Group SLA policy. This position determines the order in which policies are matched to tickets. If not specified, the Group SLA policy is added at the last position"),
    title: z.string().describe("The title of the Group SLA policy"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the Group SLA policy"),
    url: z.string().optional().describe("URL of the Group SLA policy record"),
  })).optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
})

export const listGroupSLAPolicies = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins",
  output: ListGroupSLAPoliciesOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/group_slas/policies") as any
  },
})

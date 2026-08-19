import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListSLAPoliciesOutput = z.object({
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  sla_policies: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time the SLA policy was created"),
    description: z.string().optional().describe("The description of the SLA policy"),
    filter: z.object({
      all: z.array(z.object({
        field: z.string().optional().describe("The name of a ticket field"),
        operator: z.string().optional().describe("A comparison operator"),
        value: z.union([z.string(), z.array(z.union([z.string(), z.number().int()]))]).optional().describe("The value of a ticket field"),
      })).optional(),
      any: z.array(z.object({
        field: z.string().optional().describe("The name of a ticket field"),
        operator: z.string().optional().describe("A comparison operator"),
        value: z.union([z.string(), z.array(z.union([z.string(), z.number().int()]))]).optional().describe("The value of a ticket field"),
      })).optional(),
    }).describe("An object that describes the conditions that a ticket must match in order for an SLA policy to be applied to that ticket. See [Filter](#filter)."),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    policy_metrics: z.array(z.object({
      business_hours: z.boolean().optional().describe("Whether the metric targets are being measured in business hours or calendar hours"),
      metric: z.string().optional().describe("The definition of the time that is being measured"),
      priority: z.string().optional().describe("Priority that a ticket must match"),
      target: z.number().int().optional().describe("The time within which the end-state for a metric should be met"),
    })).optional().describe("Array of [Policy Metric](#policy-metric) objects"),
    position: z.number().int().optional().describe("Position of the SLA policy that determines the order they will be matched. If not specified, the SLA policy is added as the last position"),
    title: z.string().describe("The title of the SLA policy"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the SLA policy"),
    url: z.string().optional().describe("URL of the SLA policy record"),
  })).optional(),
})

export const listSLAPolicies = pikkuSessionlessFunc({
  description: "#### Availability\n\n* Accounts on the Support Professional or Suite Growth plan or above\n\n#### Allowed For\n\n* Admins",
  output: ListSLAPoliciesOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/slas/policies") as any
  },
})

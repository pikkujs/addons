import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListCompactViewsOutput = z.object({
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  views: z.array(z.object({
    active: z.boolean().optional().describe("Whether the view is active"),
    conditions: z.record(z.string(), z.unknown()).optional().describe("Describes how the view is constructed. See [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference)"),
    created_at: z.string().datetime().optional().describe("The time the view was created"),
    default: z.boolean().optional().describe("If true, the view is a default view"),
    description: z.string().optional().describe("The description of the view"),
    execution: z.record(z.string(), z.unknown()).optional().describe("Describes how the view should be executed. See [Execution](#execution)"),
    id: z.number().int().optional().describe("Automatically assigned when created"),
    position: z.number().int().optional().describe("The position of the view"),
    restriction: z.record(z.string(), z.unknown()).optional().describe("Who may access this view. Is null when everyone in the account can access it"),
    title: z.string().optional().describe("The title of the view"),
    updated_at: z.string().datetime().optional().describe("The time the view was last updated"),
  })).optional(),
})

export const listCompactViews = pikkuSessionlessFunc({
  description: "A compacted list of shared and personal views available to the current user. This endpoint never returns more than 32 records and does not respect the \"per_page\" option.\n\n#### Allowed For\n\n* Agents",
  output: ListCompactViewsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/views/compact") as any
  },
})

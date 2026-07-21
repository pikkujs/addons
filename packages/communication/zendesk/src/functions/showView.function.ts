import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowViewInput = z.object({
  view_id: z.number().int().describe("The ID of the view. Example: 25"),
  include: z.string().optional().describe("A comma-separated list of sideloads to include in the response.\n"),
})

export const ShowViewOutput = z.object({
  columns: z.array(z.record(z.string(), z.unknown())).optional(),
  groups: z.array(z.record(z.string(), z.unknown())).optional(),
  rows: z.array(z.record(z.string(), z.unknown())).optional(),
  view: z.object({
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
  }).optional(),
})

export const showView = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: ShowViewInput,
  output: ShowViewOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/views/{view_id}", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListViewsByIdInput = z.object({
  ids: z.string().describe("List of view's ids separated by commas.. Example: \"1,2,3\""),
  active: z.boolean().optional().describe("Only active views if true, inactive views if false"),
})

export const ListViewsByIdOutput = z.object({
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

export const listViewsById = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents\n\n#### Sideloads\n\nThe following sideloads are supported:\n\n| Name             | Will sideload\n| ---------------- | -------------\n| app_installation | The app installation that requires each view, if present\n| permissions      | The permissions for each view",
  input: ListViewsByIdInput,
  output: ListViewsByIdOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/views/show_many", data) as any
  },
})

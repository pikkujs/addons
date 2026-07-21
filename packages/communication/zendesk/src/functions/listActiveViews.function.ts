import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListActiveViewsInput = z.object({
  access: z.string().optional().describe("Only views with given access. May be \"personal\", \"shared\", or \"account\""),
  group_id: z.number().int().optional().describe("Only views belonging to given group"),
  sort_by: z.string().optional().describe("Possible values are \"alphabetical\", \"created_at\", or \"updated_at\". Defaults to \"position\""),
  sort_order: z.string().optional().describe("One of \"asc\" or \"desc\". Defaults to \"asc\" for alphabetical and position sort, \"desc\" for all others"),
})

export const ListActiveViewsOutput = z.object({
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

export const listActiveViews = pikkuSessionlessFunc({
  description: "Lists active shared and personal views available to the current user.\n\n#### Sideloads\n\nThe following sideloads are supported:\n\n| Name             | Will sideload\n| ---------------- | -------------\n| app_installation | The app installation that requires each view, if present\n| permissions      | The permissions for each view\n\n#### Pagination\n\n- Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Agents",
  input: ListActiveViewsInput,
  output: ListActiveViewsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/views/active", data) as any
  },
})

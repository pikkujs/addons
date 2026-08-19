import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SearchViewsInput = z.object({
  query: z.string().describe("Query string used to find all views with matching title. Example: \"sales&group_id=25789188\""),
  access: z.string().optional().describe("Filter views by access. May be \"personal\", \"shared\", or \"account\""),
  active: z.boolean().optional().describe("Filter by active views if true or inactive views if false"),
  group_id: z.number().int().optional().describe("Filter views by group"),
  sort_by: z.string().optional().describe("Possible values are \"alphabetical\", \"created_at\", \"updated_at\", and \"position\". If unspecified, the views are sorted by relevance"),
  sort_order: z.string().optional().describe("One of \"asc\" or \"desc\". Defaults to \"asc\" for alphabetical and position sort, \"desc\" for all others"),
  include: z.string().optional().describe("A sideload to include in the response. See [Sideloads](#sideloads-3). Example: \"permissions\""),
})

export const SearchViewsOutput = z.object({
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

export const searchViews = pikkuSessionlessFunc({
  description: "#### Pagination\n\n* Offset pagination only\n\nSee [Using Offset Pagination](/api-reference/introduction/pagination/#using-offset-pagination).\n\n#### Allowed For\n\n* Agents\n\n#### Sideloads\n\nThe following sideloads are supported. For more information, see [Side-loading](/documentation/ticketing/using-the-zendesk-api/side_loading/).\n\n| Name             | Will sideload\n| ---------------- | -------------\n| app_installation | The app installation that requires each view, if present\n| permissions      | The permissions for each view",
  input: SearchViewsInput,
  output: SearchViewsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/views/search", data) as any
  },
})

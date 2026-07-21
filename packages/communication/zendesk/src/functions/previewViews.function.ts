import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PreviewViewsInput = z.object({
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  include: z.string().optional().describe("A comma-separated list of sideloads to include in the response.\n"),
  exclude: z.string().optional().describe("A comma-separated list of sideloads to exclude from the response.\n"),
})

export const PreviewViewsOutput = z.object({
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

export const previewViews = pikkuSessionlessFunc({
  description: "You can preview views by constructing the conditions in the proper format and nesting them under the `view` property. See [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference/). The output can also be controlled by passing in any of the following parameters and nesting them under the `output` property.\n\n| Name            | Type    | Comment\n| --------------- | ------- | -------\n| columns         | Array   | The ticket fields to display. System fields are looked up by name, custom fields by title or id. See the [View columns](#view-columns) table\n| group_by        | String  | When present, the field by which the tickets are grouped\n| group_order     | String  | The direction the tickets are grouped. May be one of \"asc\" or \"desc\"\n| sort_order      | String  | The direction the tickets are sorted. May be one of \"asc\" or \"desc\"\n| sort_by         | String  | The ticket field used for sorting. This will either be a title or a custom field id.\n\nThis endpoint is rate limited to 5 requests per minute, per view, per agent.\n\n#### Pagination\n\n- Cursor pagination (recommended)\n- Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\n#### Allowed For\n\n* Agents",
  input: PreviewViewsInput,
  output: PreviewViewsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/views/preview", data) as any
  },
})

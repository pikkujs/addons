import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExecuteViewInput = z.object({
  view_id: z.number().int().describe("The ID of the view. Example: 25"),
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  sort_by: z.string().optional().describe("The ticket field used for sorting. This will either be a title or a custom field id."),
  sort_order: z.string().optional().describe("The direction the tickets are sorted. May be one of 'asc' or 'desc'"),
  include: z.string().optional().describe("A comma-separated list of sideloads to include in the response.\n"),
  exclude: z.string().optional().describe("A comma-separated list of sideloads to exclude from the response.\n"),
  group_by: z.string().optional().describe("The ticket field used for grouping. This will either be a title or a custom field id."),
})

export const ExecuteViewOutput = z.object({
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

export const executeView = pikkuSessionlessFunc({
  description: "Returns the column titles and the rows of the specified view.\n\nThe `columns` array lists the view's column titles and includes only views parameters.\n\nThe `rows` array lists the values of each column for each ticket and includes parameters from both views and tickets. Though not displayed in the view, a partial ticket object is included with each row object.\n\n**Note**: To get the full ticket objects for a specified view, use [List Tickets from a View](#list-tickets-from-a-view).\n\nThis endpoint is rate limited to 5 requests per minute, per view, per agent. This rate limit includes activity in Zendesk Support. An API script is more likely to encounter rate limit errors if the authenticating agent or admin is concurrently active in Zendesk Support.\n\nThe view execution system is designed for periodic rather than high-frequency API usage. In particular, views called very frequently may be cached by Zendesk. This means that the API client will still receive a result, but that result may have been computed at any time within the last 10 minutes.\n\nZendesk recommends using the Incremental Ticket Export endpoint to get the latest changes. You can call it more often, and it returns all the tickets that changed since the last poll. For details and rate limits, see [Incremental Exports](/api-reference/ticketing/ticket-management/incremental_exports/).\n\nView output sorting can be controlled by passing the `sort_by` and `sort_order` parameters in the format described in the table in [Preview Views](#preview-views).\n\n#### Allowed For\n\n* Agents\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).",
  input: ExecuteViewInput,
  output: ExecuteViewOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/views/{view_id}/execute", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListMacrosInput = z.object({
  include: z.string().optional().describe("A sideload to include in the response. See [Sideloads](#sideloads-2). Example: \"usage_7d\""),
  access: z.string().optional().describe("Filter macros by access. Possible values are \"personal\", \"agents\", \"shared\", or \"account\". The \"agents\" value returns all personal macros for the account's agents and is only available to admins.. Example: \"personal\""),
  active: z.boolean().optional().describe("Filter by active macros if true or inactive macros if false. Example: true"),
  category: z.number().int().optional().describe("Filter macros by category. Example: 25"),
  group_id: z.number().int().optional().describe("Filter macros by group. Example: 25"),
  only_viewable: z.boolean().optional().describe("If true, returns only macros that can be applied to tickets. If false, returns all macros the current user can manage. Default is false. Example: false"),
  sort_by: z.string().optional().describe("Possible values are \"alphabetical\", \"created_at\", \"updated_at\", \"usage_1h\", \"usage_24h\", \"usage_7d\", or \"usage_30d\". Defaults to alphabetical. Example: \"alphabetical\""),
  sort_order: z.string().optional().describe("One of \"asc\" or \"desc\". Defaults to \"asc\" for alphabetical and position sort, \"desc\" for all others. Example: \"asc\""),
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
})

export const ListMacrosOutput = z.object({
  macros: z.array(z.object({
    actions: z.array(z.object({
      field: z.string().optional().describe("The name of a ticket field to modify"),
      value: z.string().optional().describe("The new value of the field"),
    })).describe("Each action describes what the macro will do. See [Actions reference](/documentation/ticketing/reference-guides/actions-reference)"),
    active: z.boolean().optional().describe("Useful for determining if the macro should be displayed"),
    created_at: z.string().datetime().optional().describe("The time the macro was created"),
    default: z.boolean().optional().describe("If true, the macro is a default macro"),
    description: z.string().nullable().optional().describe("The description of the macro"),
    id: z.number().int().optional().describe("The id automatically assigned when a macro is created"),
    position: z.number().int().optional().describe("The position of the macro"),
    raw_title: z.string().optional().describe("The raw format of the title of the macro"),
    restriction: z.record(z.string(), z.unknown()).nullable().optional().describe("Access to this macro. A null value allows unrestricted access for all users in the account"),
    title: z.string().describe("The title of the macro"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the macro"),
    url: z.string().optional().describe("A URL to access the macro's details"),
    app_installation: z.string().nullable().optional().describe("The app installation that requires each macro, if present"),
    categories: z.string().nullable().optional().describe("The macro categories"),
    permissions: z.string().nullable().optional().describe("Permissions for each macro"),
    usage_1h: z.number().int().optional().describe("The number of times each macro has been used in the past hour"),
    usage_7d: z.number().int().optional().describe("The number of times each macro has been used in the past week"),
    usage_24h: z.number().int().optional().describe("The number of times each macro has been used in the past day"),
    usage_30d: z.number().int().optional().describe("The number of times each macro has been used in the past thirty days"),
  })).optional(),
  count: z.number().int().optional().describe("the total record count"),
  next_page: z.string().url().nullable().optional().describe("the URL of the next page"),
  previous_page: z.string().url().nullable().optional().describe("the URL of the previous page"),
})

export const listMacros = pikkuSessionlessFunc({
  description: "Lists all shared and personal macros available to the current user. For admins, the API returns all macros for the account, including the personal macros of agents and other admins.\n\n#### Pagination\n\n- Cursor pagination (recommended)\n- Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n* Agents",
  input: ListMacrosInput,
  output: ListMacrosOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/macros", data) as any
  },
})

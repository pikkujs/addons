import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListUserGroupsInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  exclude_deleted: z.boolean().optional().describe("Whether to exclude deleted entities. Example: false"),
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
  include_boundary_indicators: z.boolean().optional().describe("When true, includes `has_more` indicator in the cursor pagination response meta.\n\nOnly valid with cursor pagination (page[size], page[after], page[before]).\n"),
  include_item_cursors: z.boolean().optional().describe("When true, includes cursor values for each item in the cursor pagination response.\n\nOnly valid with cursor pagination (page[size], page[after], page[before]).\n"),
})

export const ListUserGroupsOutput = z.object({
  groups: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time the group was created"),
    default: z.boolean().optional().describe("If the group is the default one for the account"),
    deleted: z.boolean().optional().describe("Deleted groups get marked as such"),
    description: z.string().optional().describe("The description of the group"),
    id: z.number().int().optional().describe("Automatically assigned when creating groups"),
    is_public: z.boolean().optional().describe("If true, the group is public.\nIf false, the group is private.\nYou can't change a private group to a public group\n"),
    name: z.string().describe("The name of the group"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the group"),
    url: z.string().optional().describe("The API url of the group"),
  })).optional(),
})

export const listUserGroups = pikkuSessionlessFunc({
  description: "Returns a list of groups for the specified user.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Admins\n* Agents",
  input: ListUserGroupsInput,
  output: ListUserGroupsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/groups", data) as any
  },
})

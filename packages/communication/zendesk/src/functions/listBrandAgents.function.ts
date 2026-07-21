import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListBrandAgentsInput = z.object({
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
})

export const ListBrandAgentsOutput = z.object({
  brand_agents: z.array(z.object({
    brand_id: z.number().int().describe("The id of a brand"),
    created_at: z.string().datetime().optional().describe("The time the brand membership was created"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the brand membership"),
    url: z.string().optional().describe("The API url of this record"),
    user_id: z.number().int().describe("The id of an agent"),
  })).optional(),
})

export const listBrandAgents = pikkuSessionlessFunc({
  description: "Returns a list of all brand agent memberships for your account.\n\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For:\n\n* Admins",
  input: ListBrandAgentsInput,
  output: ListBrandAgentsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/brand_agents", data) as any
  },
})

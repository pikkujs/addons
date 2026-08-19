import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListTagsInput = z.object({
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
})

export const ListTagsOutput = z.object({
  count: z.number().int().optional().describe("The number of pages"),
  next_page: z.string().nullable().optional().describe("The url of the previous page"),
  previous_page: z.string().nullable().optional().describe("The url of the next page"),
  tags: z.array(z.object({
    count: z.number().int().optional().describe("The number of tags"),
    name: z.string().optional().describe("A name for the tag"),
  })).optional(),
})

export const listTags = pikkuSessionlessFunc({
  description: "Lists up to the 20,000 most popular tags in the last 60 days, in decreasing popularity.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n* Agents",
  input: ListTagsInput,
  output: ListTagsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tags", data) as any
  },
})

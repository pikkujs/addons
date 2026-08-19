import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DynamicContentListVariantsInput = z.object({
  dynamic_content_item_id: z.number().int().describe("The ID of the dynamic content item. Example: 47"),
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
})

export const DynamicContentListVariantsOutput = z.object({
  variants: z.array(z.object({
    active: z.boolean().optional().describe("If the variant is active and usable"),
    content: z.string().describe("The content of the variant"),
    created_at: z.string().datetime().optional().describe("When the variant was created"),
    default: z.boolean().optional().describe("If the variant is the default for the item it belongs to"),
    id: z.number().int().optional().describe("Automatically assigned when the variant is created"),
    locale_id: z.number().int().describe("An active locale"),
    outdated: z.boolean().optional().describe("If the variant is outdated"),
    updated_at: z.string().datetime().optional().describe("When the variant was last updated"),
    url: z.string().optional().describe("The API url of the variant"),
  })).optional(),
})

export const dynamicContentListVariants = pikkuSessionlessFunc({
  description: "Returns all the variants of the specified dynamic content item.\n\n#### Allowed For\n\n* Admins\n* Agents who have permission to manage dynamic content\n\n#### Pagination\n\n* Cursor pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).",
  input: DynamicContentListVariantsInput,
  output: DynamicContentListVariantsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/dynamic_content/items/{dynamic_content_item_id}/variants", data) as any
  },
})

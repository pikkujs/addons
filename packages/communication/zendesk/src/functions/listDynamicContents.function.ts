import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListDynamicContentsInput = z.object({
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  per_page: z.number().int().min(1).optional().describe("Number of records to return per page.\n\nNote: Default and maximum values vary by endpoint. Check endpoint-specific\ndocumentation for limits.\n. Example: 50"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
})

export const ListDynamicContentsOutput = z.object({
  items: z.array(z.object({
    created_at: z.string().datetime().optional().describe("When this record was created"),
    default_locale_id: z.number().int().describe("The default locale for the item. Must be one of the [locales the account has active](/api-reference/ticketing/account-configuration/locales/#list-locales)."),
    id: z.number().int().optional().describe("Automatically assigned when creating items"),
    name: z.string().describe("The unique name of the item"),
    outdated: z.boolean().optional().describe("Indicates the item has outdated variants within it"),
    placeholder: z.string().optional().describe("Automatically generated placeholder for the item, derived from name"),
    updated_at: z.string().datetime().optional().describe("When this record was last updated"),
    url: z.string().optional().describe("The API url of this item"),
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
    })).describe("All variants within this item. See [Dynamic Content Item Variants](/api-reference/ticketing/ticket-management/dynamic_content_item_variants/)"),
  })).optional(),
})

export const listDynamicContents = pikkuSessionlessFunc({
  description: "Returns a list of all dynamic content items for your account if accessed as an admin or agents who have permission to manage dynamic content.\n\n#### Allowed For\n\n* Admins, Agents\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).",
  input: ListDynamicContentsInput,
  output: ListDynamicContentsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/dynamic_content/items", data) as any
  },
})

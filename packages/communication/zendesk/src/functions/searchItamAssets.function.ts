import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SearchItamAssetsInput = z.object({
  query: z.string().describe("Lists the search terms, separated by a space, used to identify the asset records.\n. Example: \"laptop\""),
  sort: z.string().optional().describe("Orders the returned records by: `name`, `created_at`, or `updated_at`. Defaults to sorting by relevance. Prepending `-` (`-name`, `-created_at`, or `-updated_at`) sorts the results in descending order by that value.\n"),
  "page[before]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.before_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request.\n"),
  "page[after]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.after_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request.\n"),
  "page[size]": z.number().int().optional().describe("Specifies how many assets should be returned in the response, up to 100 assets per page.\n"),
})

export const SearchItamAssetsOutput = z.object({
  assets: z.array(z.object({
    asset_tag: z.string().nullable().optional().describe("The tag for the asset"),
    asset_type_id: z.string().describe("Id of the asset type"),
    created_at: z.string().datetime().optional().describe("The time the asset record was added"),
    custom_field_values: z.record(z.string(), z.unknown()).optional().describe("User-defined custom asset fields and values"),
    external_id: z.string().nullable().optional().describe("An id you can use to link an asset to external data"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    location_id: z.string().nullable().optional().describe("Id of the asset location"),
    manufacturer: z.string().nullable().optional().describe("The asset's manufacturer name"),
    model: z.string().nullable().optional().describe("The asset's model name"),
    name: z.string().describe("Display name for the asset"),
    notes: z.string().nullable().optional().describe("The asset's notes"),
    organization_id: z.number().int().nullable().optional().describe("Id of the organization the asset is associated with"),
    purchase_cost: z.number().nullable().optional().describe("The asset's purchase cost"),
    purchase_date: z.string().date().nullable().optional().describe("The asset's purchase date"),
    serial_number: z.string().nullable().optional().describe("The asset's serial number"),
    status_id: z.string().describe("Id of current status of the asset"),
    updated_at: z.string().datetime().optional().describe("The time of the asset's last update"),
    url: z.string().optional().describe("Direct link to the specific asset"),
    user_id: z.number().int().nullable().optional().describe("Id of the user the asset is assigned to"),
    vendor: z.string().nullable().optional().describe("The asset's vendor name"),
    warranty_expiration: z.string().date().nullable().optional().describe("The asset's warranty expiration date"),
  })).optional(),
  links: z.object({
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }).optional(),
  meta: z.object({
    after_cursor: z.string().nullable(),
    before_cursor: z.string().nullable(),
    has_more: z.boolean(),
  }).optional(),
})

export const searchItamAssets = pikkuSessionlessFunc({
  description: "Returns an array of assets with values in text-based fields that match the search query.\n\nIf the query includes multiple words or numbers, it's treated as a space-separated list of search terms and assets with values matching one or more of the terms are returned. For example, `query=laptop Apple 2024` is encoded as `query=laptop%20Apple%202024` and treated as three distinct search terms: `laptop`, `Apple`, and `2024`. Every asset record with a text field containing 'laptop', 'Apple', or '2024' is returned.\n\nIf you need to search by more complex logic, use the [Filtered Search API](/api-reference/it-asset-management/assets/#filtered-search-of-assets) endpoint.\n\n#### Pagination\n\n* [Cursor pagination](/api-reference/introduction/pagination/#cursor-pagination) only.\n* Returns the assets sorted by relevancy with page limits. Without a `sort` parameter, only the first 10,000 assets are returned. If your request includes a `sort` parameter, all assets are returned.\n\n#### Allowed For\n\n* Agents",
  input: SearchItamAssetsInput,
  output: SearchItamAssetsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/it_asset_management/assets/search", data) as any
  },
})

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilteredSearchItamAssetsInput = z.object({
  query: z.string().optional().describe("Lists the search terms, separated by a space, used to identify the asset records.\n. Example: \"laptop\""),
  sort: z.string().optional().describe("Orders the returned records by: `name`, `created_at`, or `updated_at`. Defaults to sorting by relevance. Prepending `-` (`-name`, `-created_at`, or `-updated_at`) sorts the results in descending order by that value.\n"),
  "page[before]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.before_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request\n"),
  "page[after]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.after_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request\n"),
  "page[size]": z.number().int().optional().describe("Specifies how many assets should be returned in the response, up to 100 assets per page.\n"),
  body: z.union([z.object({
  filter: z.object({
    field_key: z.object({
      operator: z.string().optional(),
      value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
    }).nullable().optional(),
  }).optional(),
}), z.object({
  filter: z.object({
    $and: z.array(z.object({
      field_key: z.object({
        operator: z.string().optional(),
        value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
      }).nullable().optional(),
    })).optional(),
    $or: z.array(z.object({
      field_key: z.object({
        operator: z.string().optional(),
        value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
      }).nullable().optional(),
    })).optional(),
  }).optional(),
})]),
})

export const FilteredSearchItamAssetsOutput = z.object({
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

export const filteredSearchItamAssets = pikkuSessionlessFunc({
  description: "Returns an array of assets that meet the complex search and filter criteria. For simple searches limited to text fields, use the [Search Assets API](/api-reference/it-asset-management/assets/#search-assets) endpoint instead.\n\nFilters can contain either an individual [comparison object](#comparison-object) or an array of [comparison objects](#comparison-object) within logical namespaces.\n\nA filter is a JSON object that has the following properties:\n\n| Name      | Type   | Required | Description\n| --------- | ------ | -------- | -----------\n| ATTRIBUTE | object | no       | A [comparison object](#comparison-object) specifying an attribute value condition to be met for assets to match.<br/><br/>Examples are marked below.\n| $and      | array  | no       | Array of comparison objects combined using logical AND\n| $or       | array  | no       | Array of comparison objects combined using logical OR\n\n##### Examples\n\n```js\n{\n  \"filter\": {\n    \"model\": { \"$eq\": \"MacBook Pro\" } // ATTRIBUTE (standard field)\n  }\n}\n```\n\n```js\n{\n  \"filter\": {\n    \"custom_object_fields.ip_address\": { \"$eq\": \"192.168.1.1\" } // ATTRIBUTE (custom field)\n  }\n}\n```\n\n```js\n// $or\n{\n  \"filter\": {\n    \"$or\": [\n      { \"model\": { \"$eq\": \"MacBook Pro\" } }, // ATTRIBUTE\n      { \"model\": { \"$eq\": \"ThinkPad X1\" } } // ATTRIBUTE\n    ]\n  }\n}\n```\n\n#### Comparison Object\n\nA comparison object is essentially an 'if' statement that returns all asset records that meet the specified condition. Conditions are based on attribute values.\n\nA comparison object is a JSON object that has the following properties:\n\n| Name      | Type          | Required | Description\n| --------- | ------------- | -------- | -----------\n| FIELD_KEY | string        | yes      | To filter on a custom asset field, you must prepend `custom_object_fields.` on the field key. For example: `custom_object_fields.ip_address`<br/><br/>The following standard asset fields can be used without needing to prepend a namespace: `asset_type`, `user`, `organization`, `location`, `model`, `purchase_date`, `status`\n| OPERATOR  | string        | yes      | A comparison operator, such as `$eq`\n| VALUE     | string, array | yes      | The value you're filtering for\n\n* Date values should be in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.\n\n#### Pagination\n\n* [Cursor pagination](/api-reference/introduction/pagination/#cursor-pagination) only.\n* Returns the assets sorted by relevancy with page limits. Requests with a `sort` parameter return all assets; requests without a `sort` parameter return the first 10,000 assets only.\n\n#### Allowed For\n\n* Agents",
  input: FilteredSearchItamAssetsInput,
  output: FilteredSearchItamAssetsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/it_asset_management/assets/search", data) as any
  },
})

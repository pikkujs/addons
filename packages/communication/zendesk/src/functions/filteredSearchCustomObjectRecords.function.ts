import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FilteredSearchCustomObjectRecordsInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  query: z.string().optional().describe("The query parameter is used to search text-based fields for records that match specific query terms.\nThe query can be multiple words or numbers. Every record that matches the beginning of any word or number in the query string is returned.<br/><br/>\n\nFuzzy search is supported for the following text-based field types: Text fields, Multi Line Text fields, and RegExp fields.<br/><br/>\n\nFor example, you might want to search for records related to Tesla vehicles: `query=Tesla`. In this example the API would return every record for the given custom object where any of the supported text fields contain the word 'Tesla'.<br/><br/>\n\nYou can include multiple words or numbers in your search. For example: `query=Tesla Honda 2020`. This search phrase would be URL encoded as `query=Tesla%20Honda%202020` and return every record for the custom object for which any of the supported text fields contained 'Tesla', 'Honda', or '2020'.\n. Example: \"jdoe\""),
  sort: z.string().optional().describe("One of \"name\", \"created_at\", \"updated_at\", \"-name\", \"-created_at\", or \"-updated_at\". The \"-\" denotes the sort will be descending. Defaults to sorting by relevance.\n"),
  "page[before]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.before_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request.\n"),
  "page[after]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.after_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request.\n"),
  "page[size]": z.number().int().optional().describe("Specifies how many records should be returned in the response. You can specify up to 100 records per page.\n"),
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

export const FilteredSearchCustomObjectRecordsOutput = z.object({
  count: z.number().int().optional().describe("The number of results returned for the current request"),
  custom_object_records: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time the object was created"),
    created_by_user_id: z.string().optional().describe("Id of a user who created the object"),
    custom_object_fields: z.record(z.string(), z.unknown()).optional(),
    custom_object_key: z.string().optional().describe("A user-defined unique identifier"),
    external_id: z.string().nullable().optional().describe("An id you can use to link custom object records to external data"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    name: z.string().describe("User-defined display name for the object. If autonumbering is selected for the custom object's name field, the name isn't allowed because it's automatically generated. If uniqueness is enabled, the name must be unique."),
    photo: z.record(z.string(), z.unknown()).nullable().optional().describe("The record photo represented as an [Attachment](/api-reference/ticketing/tickets/ticket-attachments/). The `allows_photos` property must be set to true for the object. Record photos are publicly accessible via the photo `content_url`."),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the object"),
    updated_by_user_id: z.string().optional().describe("Id of the last user who updated the object"),
    url: z.string().optional().describe("Direct link to the specific custom object"),
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

export const filteredSearchCustomObjectRecords = pikkuSessionlessFunc({
  description: "Returns an array of custom object records that meet the search and filter criteria. For simple searches limited to only text fields and no complex logic, use the [Search Custom Object Records API](/api-reference/custom-data/custom-objects/custom_object_records/#search-custom-object-records) endpoint.\n\nIf the object has a parent field with `cascade_permissions_enabled`, non-admin agents must include a filter on the parent field (for example, `\"custom_object_fields.parent_field_key\": { \"$eq\": \"parent_record_id\" }`). Requests without a parent filter return `403 Forbidden`.\n\nFilters can contain either an individual [comparison object](#comparison-object) or an array of [comparison objects](#comparison-object) within logical namespaces.\n\nA filter is a JSON object that has the following properties:\n\n| Name      | Type   | Required | Description\n| --------- | ------ | -------- | -----------\n| ATTRIBUTE | object | no       | A [comparison object](#comparison-object) specifying an attribute value condition to be met for records to match.<br/><br/>Examples are marked below.\n| $and      | array  | no       | Array of conjunctive filter objects (logical AND)\n| $or       | array  | no       | Array of conjunctive filter objects (logical OR)\n\n##### Examples\n\n```js\n{\n  \"filter\": {\n    \"custom_object_fields.field_key\": { \"$eq\": \"value\" } // ATTRIBUTE\n  }\n}\n```\n\n```js\n// $or\n{\n  \"filter\": {\n    \"$or\": [\n      { \"custom_object_fields.field_key\": { \"$eq\": \"value\" } }, // ATTRIBUTE\n      { \"external_id\": { \"$eq\": \"Record123\" } } // ATTRIBUTE\n    ]\n  }\n}\n```\n\n#### Comparison Object\n\nA comparison object defines a condition a record must meet to be considered a match. The condition is based on an attribute value or object type.\n\nA comparison object is a JSON object that has the following properties:\n\n| Name      | Type          | Required | Description\n| --------- | ------------- | -------- | -----------\n| FIELD_KEY | string        | yes      | When filtering on a custom field, they must be namedspaced with `custom_object_fields.`. ex. `custom_object_fields.field_key`<br/><br/>When filtering on a standard field, no namespace is required. The following fields are considered standard: `created_at`, `updated_at`, `created_by_user`, `updated_by_user`, `name`, `external_id`\n| OPERATOR  | string        | yes      | [Supported operators](/documentation/custom-data/v2/searching-custom-object-records/) vary by the value's data type\n| VALUE     | string, array | yes      | The value you're filtering for\n\n* Date values should be in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.\n\n#### Pagination\n\n* [Cursor pagination](/api-reference/introduction/pagination/#cursor-pagination) only.\n* Returns the records sorted by relevancy with page limits. Without a `sort` parameter, only the first 10,000 records are returned. With a `sort` parameter, all records are returned.\n\n#### Allowed For\n\n* Agents\n* End users (when an admin [configures](https://support.zendesk.com/hc/en-us/articles/6034260247066) the custom object to be accessible to end users)",
  input: FilteredSearchCustomObjectRecordsInput,
  output: FilteredSearchCustomObjectRecordsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/custom_objects/{custom_object_key}/records/search", data) as any
  },
})

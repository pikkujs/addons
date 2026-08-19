import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SearchCustomObjectRecordsInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  query: z.string().optional().describe("The query parameter is used to search text-based fields for records that match specific query terms.\nThe query can be multiple words or numbers. Every record that matches the beginning of any word or number in the query string is returned.<br/><br/>\n\nFuzzy search is supported for the following text-based field types: Text fields, Multi Line Text fields, and RegExp fields.<br/><br/>\n\nFor example, you might want to search for records related to Tesla vehicles: `query=Tesla`. In this example the API would return every record for the given custom object where any of the supported text fields contain the word 'Tesla'.<br/><br/>\n\nYou can include multiple words or numbers in your search. For example: `query=Tesla Honda 2020`. This search phrase would be URL encoded as `query=Tesla%20Honda%202020` and return every record for the custom object for which any of the supported text fields contained 'Tesla', 'Honda', or '2020'.\n. Example: \"jdoe\""),
  sort: z.string().optional().describe("One of `name`, `created_at`, `updated_at`, `-name`, `-created_at`, or `-updated_at`. The `-` denotes the sort will be descending. Defaults to sorting by relevance.\n"),
  "page[before]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.before_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request.\n"),
  "page[after]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.after_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request.\n"),
  "page[size]": z.number().int().optional().describe("Specifies how many records should be returned in the response. You can specify up to 100 records per page.\n"),
})

export const SearchCustomObjectRecordsOutput = z.object({
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

export const searchCustomObjectRecords = pikkuSessionlessFunc({
  description: "Returns an array of custom object records where the search query matches the values in Text Fields, Multi Line Text fields, and RegExp fields. To find records in other fields, use the [Filtered Search API](/api-reference/custom-data/custom-objects/custom_object_records/#filtered-search-of-custom-object-records) endpoint.\n\nIf the object has a parent field with `cascade_permissions_enabled`, non-admin agents receive a `403 Forbidden` response. Use the [Filtered Search endpoint](/api-reference/custom-data/custom-objects/custom_object_records/#filtered-search-of-custom-object-records) with a filter on the parent field instead.\n\n#### Pagination\n\n* [Cursor pagination](/api-reference/introduction/pagination/#cursor-pagination) only.\n* Returns the records sorted by relevancy with page limits. Without a `sort` parameter, only the first 10,000 records are returned. With a `sort` parameter, all records are returned.\n#### Allowed For\n* Agents",
  input: SearchCustomObjectRecordsInput,
  output: SearchCustomObjectRecordsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects/{custom_object_key}/records/search", data) as any
  },
})

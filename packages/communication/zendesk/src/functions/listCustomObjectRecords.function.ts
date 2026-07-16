import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListCustomObjectRecordsInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  "filter[ids]": z.string().optional().describe("Optional comma-separated list of ids to filter records by. If one or more ids are specified, only matching records are returned. The ids must be unique and are case sensitive."),
  "filter[external_ids]": z.string().optional().describe("Optional comma-separated list of external ids to filter records by. If one or more ids are specified, only matching records are returned. The ids must be unique and are case sensitive."),
  sort: z.string().optional().describe("One of `id`, `updated_at`, `-id`, or `-updated_at`. The `-` denotes the sort will be descending.\n"),
  "page[before]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.before_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request.\n"),
  "page[after]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.after_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request.\n"),
  "page[size]": z.number().int().optional().describe("Specifies how many records should be returned in the response. You can specify up to 100 records per page.\n"),
})

export const ListCustomObjectRecordsOutput = z.object({
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

export const listCustomObjectRecords = pikkuSessionlessFunc({
  description: "Lists all undeleted custom object records for the specified object.\n\nIf the object has a parent field with `cascade_permissions_enabled`, non-admin agents receive a `403 Forbidden` response. Use the [Filtered Search endpoint](#filtered-search-of-custom-object-records) with a filter on the parent field instead.\n\n #### Pagination\n\n* [Cursor pagination](/api-reference/introduction/pagination/#cursor-pagination) only.\n#### Allowed For\n* Agents",
  input: ListCustomObjectRecordsInput,
  output: ListCustomObjectRecordsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects/{custom_object_key}/records", data) as any
  },
})

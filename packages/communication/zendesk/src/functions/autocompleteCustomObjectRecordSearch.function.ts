import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AutocompleteCustomObjectRecordSearchInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  name: z.string().optional().describe("Part of a name of the record you are searching for"),
  "page[before]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.before_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request.\n"),
  "page[after]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.after_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request.\n"),
  "page[size]": z.number().int().optional().describe("The number of records to return in the response. You can specify up to 100 records per page.\n"),
  field_id: z.string().optional().describe("The id of the lookup field. If the field has a relationship filter, the filter is applied to the results. Must be used with `source` param.\n"),
  source: z.string().optional().describe("One of \"zen:user\", \"zen:ticket\", \"zen:organization\", or \"zen:custom_object:CUSTOM_OBJECT_KEY\". Represents the object `field_id` belongs to. Must be used with field_id param.\n"),
  "filter[dynamic_values]": z.record(z.string(), z.number().int()).optional().describe("Provided values to be used with [dynamic filters](/api-reference/ticketing/lookup_relationships/lookup_relationships/#using-dynamic-filters).\n"),
  requester_id: z.number().int().optional().describe("The id of the requester. For use with dynamic filters.\n. Example: 264817272"),
  assignee_id: z.number().int().optional().describe("The id of the selected assignee. For use with dynamic filters.\n. Example: 7334148660734"),
  organization_id: z.number().int().optional().describe("The id of the organization the requester belongs to. For use with dynamic filters.\n. Example: 5633330889598"),
})

export const AutocompleteCustomObjectRecordSearchOutput = z.object({
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

export const autocompleteCustomObjectRecordSearch = pikkuSessionlessFunc({
  description: "Retrieves an array of custom object records that have a field value that matches the value specified in the `name` parameter.\n\nIf the object has a parent field with `cascade_permissions_enabled`, the request must be made in the context of a cascade parent field using the `field_id` and `source` parameters.\n\n#### Pagination\n\n* [Cursor pagination](/api-reference/introduction/pagination/#cursor-pagination) only.\n* Returns the first 10,000 records sorted by relevancy with page limits.\n#### Allowed For\n* Agents",
  input: AutocompleteCustomObjectRecordSearchInput,
  output: AutocompleteCustomObjectRecordSearchOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects/{custom_object_key}/records/autocomplete", data) as any
  },
})

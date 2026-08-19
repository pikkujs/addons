import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, TooManyRequestsError } from '@pikku/core/errors'

export const IncrementalCustomObjectRecordExportCursorInput = z.object({
  custom_object_key: z.string().describe("The key identifier for the custom object. Example: \"apartment\""),
  start_time: z.number().int().optional().describe("The time to start the incremental export from. Must be at least one minute in the past. Data isn't provided for the most recent minute. Required on the initial export request; not required on subsequent cursor-based pagination requests. Example: 1332034771"),
  cursor: z.string().optional().describe("The cursor pointer to work with for all subsequent exports after the initial request"),
  per_page: z.number().int().min(1).max(1000).optional().default(1000).describe("Number of records to return per page (default 1000, maximum 1000)"),
  "filter[exclude_deleted]": z.boolean().optional().default(false).describe("If true, exclude deleted records from the export"),
})

export const IncrementalCustomObjectRecordExportCursorOutput = z.object({
  after_cursor: z.string().nullable().optional().describe("Cursor value for the next page. Use this value for the cursor parameter in the next request."),
  after_url: z.string().nullable().optional().describe("URL to fetch the next page of results. Null if this is the last page."),
  before_cursor: z.string().nullable().optional().describe("Cursor value for the previous page. Null if this is the first page."),
  before_url: z.string().nullable().optional().describe("URL to fetch the previous page of results. Null if this is the first page."),
  custom_object_records: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time the object was created"),
    created_by_user_id: z.string().optional().describe("Id of a user who created the object"),
    custom_object_fields: z.record(z.string(), z.unknown()).optional().describe("Custom field values. For deleted records, field values will be \"[DELETED]\" unless exclude_deleted filter is used."),
    custom_object_key: z.string().optional().describe("A user-defined unique identifier for the custom object"),
    external_id: z.string().nullable().optional().describe("An id you can use to link custom object records to external data"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    name: z.string().optional().describe("User-defined display name for the object. May be \"[DELETED]\" for deleted records."),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the object"),
    updated_by_user_id: z.string().optional().describe("Id of the last user who updated the object"),
    url: z.string().optional().describe("Direct link to the specific custom object record"),
  })).optional().describe("Array of custom object records that have changed since the start time."),
  filter: z.object({
    exclude_deleted: z.boolean().optional().describe("Whether deleted records were excluded from the export"),
  }).nullable().optional().describe("Applied filters for the export"),
  meta: z.object({
    has_more: z.boolean().optional().describe("Indicates whether there are more records to export after this page"),
  }).optional().describe("Metadata about the export operation"),
}).describe("Response for incremental export of custom object records. See [Custom Object Records](/api-reference/custom-data/custom-objects/custom_object_records/) for detailed information about custom object record properties.\n")

export const incrementalCustomObjectRecordExportCursor = pikkuSessionlessFunc({
  description: "Returns the custom object records that changed since the start time. This endpoint supports \ncursor-based incremental exports for custom object records.\n\nThis endpoint only supports cursor-based pagination and does not support offset-based pagination.\nCursor-based exports provide more consistent performance and response body sizes. For more information, \nsee [Cursor-based incremental exports](/documentation/ticketing/managing-tickets/using-the-incremental-export-api#cursor-based-incremental-exports) in [Using the Incremental Exports API](/documentation/ticketing/managing-tickets/using-the-incremental-export-api).\n\n#### Allowed For\n\n* Admins\n* Agents with custom object read permissions\n\n#### Rate Limiting\n\nYou can make up to 10 requests per minute to this endpoint.\n\n#### Notes\n\n- `start_time` is only required for the initial request for the pages in the record set, then `cursor` is required for all subsequent requests\n- The `start_time` must be more than 60 seconds ago\n- Deleted records will have their field values replaced with \"[DELETED]\" unless excluded via filter\n- Photo fields are excluded from incremental export responses",
  input: IncrementalCustomObjectRecordExportCursorInput,
  output: IncrementalCustomObjectRecordExportCursorOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, TooManyRequestsError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/incremental/custom_objects/{custom_object_key}/cursor", data) as any
  },
})

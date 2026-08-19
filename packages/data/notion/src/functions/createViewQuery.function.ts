// Views — View endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const CreateViewQueryInput = z.object({
  view_id: z.string().describe("The ID of the view."),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
  page_size: z.number().int().min(1).max(100).optional().describe("The number of results to return per page. Maximum: 100"),
})

export const CreateViewQueryOutput = z.object({
  object: z.string().describe("The object type."),
  id: z.string().uuid().describe("The query ID."),
  view_id: z.string().uuid().describe("The view this query was executed against."),
  expires_at: z.string().datetime().describe("When the cached query results expire."),
  total_count: z.number().describe("Total number of results in the query."),
  results: z.array(z.object({
    object: z.string().describe("The object type."),
    id: z.string().uuid().describe("The object ID."),
  })).max(100).describe("The page results for this page."),
  next_cursor: z.union([z.string().uuid(), z.unknown()]).describe("Cursor for the next page of results."),
  has_more: z.boolean().describe("Whether there are more results."),
  request_status: z.object({
    type: z.enum(["complete", "incomplete"]).describe("Whether the result set is complete or incomplete. `incomplete` means the response does not include all rows that match the query parameters (e.g. due to a server-side pagination depth limit)."),
    incomplete_reason: z.string().optional().describe("Why the result set is incomplete. Only present when `type` is `incomplete`."),
  }).optional().describe("Set to `{ type: 'incomplete', incomplete_reason: 'query_result_limit_reached' }` when the view's underlying data source has more rows matching this query than the server-side pagination depth limit allows."),
})

export const createViewQuery = pikkuSessionlessFunc({
  description: "Create a view query",
  input: CreateViewQueryInput,
  output: CreateViewQueryOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("POST", "/v1/views/{view_id}/queries", data) as any
  },
})

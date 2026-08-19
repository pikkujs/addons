// Views — View endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const GetViewQueryResultsInput = z.object({
  view_id: z.string().describe("The ID of the view."),
  query_id: z.string().describe("The ID of the query."),
  start_cursor: z.string().optional().describe("If supplied, this endpoint will return a page of results starting after the cursor provided."),
  page_size: z.number().int().min(1).max(100).optional().describe("The number of results to return per page. Maximum: 100"),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const GetViewQueryResultsOutput = z.object({
  object: z.string().describe("Always `list`"),
  next_cursor: z.union([z.string().uuid(), z.unknown()]),
  has_more: z.boolean(),
  results: z.array(z.object({
    object: z.string().describe("The page object type name."),
    id: z.string().uuid().describe("The ID of the page."),
  })),
  type: z.string().describe("Always `page`"),
  page: z.record(z.string(), z.unknown()),
  request_status: z.object({
    type: z.enum(["complete", "incomplete"]).describe("Whether the result set is complete or incomplete. `incomplete` means the response does not include all rows that match the query parameters (e.g. due to a server-side pagination depth limit)."),
    incomplete_reason: z.string().optional().describe("Why the result set is incomplete. Only present when `type` is `incomplete`."),
  }).optional(),
})

export const getViewQueryResults = pikkuSessionlessFunc({
  description: "Get view query results",
  input: GetViewQueryResultsInput,
  output: GetViewQueryResultsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/views/{view_id}/queries/{query_id}", data) as any
  },
})

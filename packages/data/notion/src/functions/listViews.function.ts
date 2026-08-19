// Views — View endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const ListViewsInput = z.object({
  database_id: z.string().optional().describe("ID of a Notion database (collection view block) to list views for. At least one of database_id or data_source_id is required."),
  data_source_id: z.string().optional().describe("ID of a data source (collection) to list all views for, including linked views across the workspace. At least one of database_id or data_source_id is required."),
  start_cursor: z.string().optional().describe("If supplied, this endpoint will return a page of results starting after the cursor provided. If not supplied, this endpoint will return the first page of results."),
  page_size: z.number().int().min(1).max(100).optional().describe("The number of items from the full list desired in the response. Maximum: 100"),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const ListViewsOutput = z.object({
  object: z.string().describe("Always `list`"),
  next_cursor: z.union([z.string().uuid(), z.unknown()]),
  has_more: z.boolean(),
  results: z.array(z.object({
    object: z.string().describe("The object type name."),
    id: z.string().uuid().describe("The ID of the view."),
  })),
  type: z.string().describe("Always `view`"),
  view: z.record(z.string(), z.unknown()),
  request_status: z.object({
    type: z.enum(["complete", "incomplete"]).describe("Whether the result set is complete or incomplete. `incomplete` means the response does not include all rows that match the query parameters (e.g. due to a server-side pagination depth limit)."),
    incomplete_reason: z.string().optional().describe("Why the result set is incomplete. Only present when `type` is `incomplete`."),
  }).optional(),
})

export const listViews = pikkuSessionlessFunc({
  description: "List views",
  input: ListViewsInput,
  output: ListViewsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/views", data) as any
  },
})

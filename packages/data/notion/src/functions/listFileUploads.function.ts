// File uploads — File upload endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const ListFileUploadsInput = z.object({
  status: z.enum(["pending", "uploaded", "expired", "failed"]).optional().describe("If supplied, the endpoint will return file uploads with the specified status."),
  start_cursor: z.string().optional().describe("If supplied, this endpoint will return a page of results starting after the cursor provided. If not supplied, this endpoint will return the first page of results."),
  page_size: z.number().int().min(1).max(100).optional().describe("The number of items from the full list desired in the response. Maximum: 100"),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const ListFileUploadsOutput = z.object({
  object: z.string().describe("Always `list`"),
  next_cursor: z.union([z.string().uuid(), z.unknown()]),
  has_more: z.boolean(),
  results: z.array(z.object({
    object: z.string().describe("Always `file_upload`"),
    id: z.string().uuid(),
    created_time: z.string().datetime(),
    created_by: z.object({
      id: z.string().uuid(),
      type: z.enum(["person", "bot", "agent"]).describe("One of: `person`, `bot`, `agent`"),
    }),
    last_edited_time: z.string().datetime(),
    in_trash: z.boolean(),
    expiry_time: z.union([z.string().datetime(), z.unknown()]),
    status: z.enum(["pending", "uploaded", "expired", "failed"]).describe("One of: `pending`, `uploaded`, `expired`, `failed`"),
    filename: z.union([z.string(), z.unknown()]),
    content_type: z.union([z.string(), z.unknown()]),
    content_length: z.union([z.number().int(), z.unknown()]),
    upload_url: z.string().optional(),
    complete_url: z.string().optional(),
    file_import_result: z.object({
      imported_time: z.string().datetime().describe("The time the file was imported into Notion. ISO 8601 format."),
    }).optional(),
    number_of_parts: z.object({
      total: z.number().int().min(0),
      sent: z.number().int().min(0),
    }).optional(),
  })),
  type: z.string().describe("Always `file_upload`"),
  file_upload: z.record(z.string(), z.unknown()),
  request_status: z.object({
    type: z.enum(["complete", "incomplete"]).describe("Whether the result set is complete or incomplete. `incomplete` means the response does not include all rows that match the query parameters (e.g. due to a server-side pagination depth limit)."),
    incomplete_reason: z.string().optional().describe("Why the result set is incomplete. Only present when `type` is `incomplete`."),
  }).optional(),
})

export const listFileUploads = pikkuSessionlessFunc({
  description: "List file uploads",
  input: ListFileUploadsInput,
  output: ListFileUploadsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/file_uploads", data) as any
  },
})

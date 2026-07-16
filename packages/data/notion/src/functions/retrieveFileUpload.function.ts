// File uploads — File upload endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const RetrieveFileUploadInput = z.object({
  file_upload_id: z.string().describe("Identifier for a Notion file upload object."),
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
})

export const RetrieveFileUploadOutput = z.object({
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
})

export const retrieveFileUpload = pikkuSessionlessFunc({
  description: "Retrieve a file upload",
  input: RetrieveFileUploadInput,
  output: RetrieveFileUploadOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("GET", "/v1/file_uploads/{file_upload_id}", data) as any
  },
})

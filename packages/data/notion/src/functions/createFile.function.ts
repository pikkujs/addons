// File uploads — File upload endpoints

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError } from '@pikku/core/errors'

export const CreateFileInput = z.object({
  "Notion-Version": z.literal("2026-03-11").describe("The [API version](/reference/versioning) to use for this request. The latest version is `2026-03-11`."),
  mode: z.enum(["single_part", "multi_part", "external_url"]).optional().describe("How the file is being sent. Use `multi_part` for files larger than 20MB. Use `external_url` for files that are temporarily hosted publicly elsewhere. Default is `single_part`."),
  filename: z.string().optional().describe("Name of the file to be created. Required when `mode` is `multi_part`. Otherwise optional, and used to override the filename. Must include an extension, or have one inferred from the `content_type` parameter."),
  content_type: z.string().optional().describe("MIME type of the file to be created. Recommended when sending the file in multiple parts. Must match the content type of the file that's sent, and the extension of the `filename` parameter if any."),
  number_of_parts: z.number().int().min(1).max(10000).optional().describe("When `mode` is `multi_part`, the number of parts you are uploading. This must match the number of parts as well as the final `part_number` you send."),
  external_url: z.string().optional().describe("When `mode` is `external_url`, provide the HTTPS URL of a publicly accessible file to import into your workspace."),
})

export const CreateFileOutput = z.object({
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

export const createFile = pikkuSessionlessFunc({
  description: "Create a file upload",
  input: CreateFileInput,
  output: CreateFileOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError],
  func: async ({ notion }, data) => {
    return notion.call("POST", "/v1/file_uploads", data) as any
  },
})

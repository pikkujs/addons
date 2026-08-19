// files — Endpoints for uploading and interacting with files.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListFilesInfoInput = z.object({
  file_id: z.string().describe("The ID of the file info to get"),
})

export const ListFilesInfoOutput = z.object({
  id: z.string().optional().describe("The unique identifier for this file"),
  user_id: z.string().optional().describe("The ID of the user that uploaded this file"),
  post_id: z.string().optional().describe("If this file is attached to a post, the ID of that post"),
  create_at: z.number().int().optional().describe("The time in milliseconds a file was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a file was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a file was deleted"),
  name: z.string().optional().describe("The name of the file"),
  extension: z.string().optional().describe("The extension at the end of the file name"),
  size: z.number().int().optional().describe("The size of the file in bytes"),
  mime_type: z.string().optional().describe("The MIME type of the file"),
  width: z.number().int().optional().describe("If this file is an image, the width of the file"),
  height: z.number().int().optional().describe("If this file is an image, the height of the file"),
  has_preview_image: z.boolean().optional().describe("If this file is an image, whether or not it has a preview-sized version"),
})

export const listFilesInfo = pikkuSessionlessFunc({
  description: "Gets a file's info.\n##### Permissions\nMust have `read_channel` permission or be uploader of the file.",
  input: ListFilesInfoInput,
  output: ListFilesInfoOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/files/{file_id}/info", data) as any
  },
})

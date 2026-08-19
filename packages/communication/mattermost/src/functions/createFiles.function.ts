// files — Endpoints for uploading and interacting with files.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateFilesInput = z.object({
  channel_id: z.string().optional().describe("The ID of the channel that this file will be uploaded to"),
  filename: z.string().optional().describe("The name of the file to be uploaded"),
})

export const CreateFilesOutput = z.object({
  file_infos: z.array(z.object({
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
  })).optional().describe("A list of file metadata that has been stored in the database"),
  client_ids: z.array(z.string()).optional().describe("A list of the client_ids that were provided in the request"),
})

export const createFiles = pikkuSessionlessFunc({
  description: "Uploads a file that can later be attached to a post.\n\nThis request can either be a multipart/form-data request with a channel_id, files and optional\nclient_ids defined in the FormData, or it can be a request with the channel_id and filename\ndefined as query parameters with the contents of a single file in the body of the request.\n\nOnly multipart/form-data requests are supported by server versions up to and including 4.7.\nServer versions 4.8 and higher support both types of requests.\n\n##### Permissions\nMust have `upload_file` permission.",
  input: CreateFilesInput,
  output: CreateFilesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/files", data) as any
  },
})

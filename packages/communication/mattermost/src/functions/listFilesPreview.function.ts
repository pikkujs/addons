// files — Endpoints for uploading and interacting with files.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListFilesPreviewInput = z.object({
  file_id: z.string().describe("The ID of the file to get"),
})

export const listFilesPreview = pikkuSessionlessFunc({
  description: "Gets a file's preview.\n##### Permissions\nMust have `read_channel` permission or be uploader of the file.",
  input: ListFilesPreviewInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/files/{file_id}/preview", data)
  },
})

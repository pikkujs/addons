// files — Endpoints for uploading and interacting with files.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetFileInput = z.object({
  file_id: z.string().describe("The ID of the file to get"),
})

export const getFile = pikkuSessionlessFunc({
  description: "Gets a file that has been uploaded previously.\n##### Permissions\nMust have `read_channel` permission or be uploader of the file.",
  input: GetFileInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/files/{file_id}", data)
  },
})

// files — Endpoints for uploading and interacting with files.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListFilesLinkInput = z.object({
  file_id: z.string().describe("The ID of the file to get a link for"),
})

export const ListFilesLinkOutput = z.object({
  link: z.string().optional(),
})

export const listFilesLink = pikkuSessionlessFunc({
  description: "Gets a public link for a file that can be accessed without logging into Mattermost.\n##### Permissions\nMust have `read_channel` permission or be uploader of the file.",
  input: ListFilesLinkInput,
  output: ListFilesLinkOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/files/{file_id}/link", data) as any
  },
})

// posts — Endpoints for creating, getting and interacting with posts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListPostsFilesInfoInput = z.object({
  post_id: z.string().describe("ID of the post"),
})

export const ListPostsFilesInfoOutput = z.array(z.object({
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
}))

export const listPostsFilesInfo = pikkuSessionlessFunc({
  description: "Gets a list of file information objects for the files attached to a post.\n##### Permissions\nMust have `read_channel` permission for the channel the post is in.",
  input: ListPostsFilesInfoInput,
  output: ListPostsFilesInfoOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/posts/{post_id}/files/info", data) as any
  },
})

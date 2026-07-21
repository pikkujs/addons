// posts — Endpoints for creating, getting and interacting with posts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const DeletePostInput = z.object({
  post_id: z.string().describe("ID of the post to delete"),
})

export const DeletePostOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deletePost = pikkuSessionlessFunc({
  description: "Soft deletes a post, by marking the post as deleted in the database. Soft deleted posts will not be returned in post queries.\n##### Permissions\nMust be logged in as the user or have `delete_others_posts` permission.",
  input: DeletePostInput,
  output: DeletePostOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/posts/{post_id}", data) as any
  },
})

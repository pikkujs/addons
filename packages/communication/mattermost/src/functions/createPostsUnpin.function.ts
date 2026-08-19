// posts — Endpoints for creating, getting and interacting with posts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreatePostsUnpinInput = z.object({
  post_id: z.string().describe("Post GUID"),
})

export const CreatePostsUnpinOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createPostsUnpin = pikkuSessionlessFunc({
  description: "Unpin a post to a channel it is in based from the provided post id string.\n##### Permissions\nMust be authenticated and have the `read_channel` permission to the channel the post is in.",
  input: CreatePostsUnpinInput,
  output: CreatePostsUnpinOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/posts/{post_id}/unpin", data) as any
  },
})

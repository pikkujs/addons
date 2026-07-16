// posts — Endpoints for creating, getting and interacting with posts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreatePostsPinInput = z.object({
  post_id: z.string().describe("Post GUID"),
})

export const CreatePostsPinOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createPostsPin = pikkuSessionlessFunc({
  description: "Pin a post to a channel it is in based from the provided post id string.\n##### Permissions\nMust be authenticated and have the `read_channel` permission to the channel the post is in.",
  input: CreatePostsPinInput,
  output: CreatePostsPinOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/posts/{post_id}/pin", data) as any
  },
})

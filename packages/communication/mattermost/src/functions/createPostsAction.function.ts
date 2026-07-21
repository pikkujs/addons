// posts — Endpoints for creating, getting and interacting with posts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreatePostsActionInput = z.object({
  post_id: z.string().describe("Post GUID"),
  action_id: z.string().describe("Action GUID"),
})

export const CreatePostsActionOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createPostsAction = pikkuSessionlessFunc({
  description: "Perform a post action, which allows users to interact with integrations through posts.\n##### Permissions\nMust be authenticated and have the `read_channel` permission to the channel the post is in.",
  input: CreatePostsActionInput,
  output: CreatePostsActionOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/posts/{post_id}/actions/{action_id}", data) as any
  },
})

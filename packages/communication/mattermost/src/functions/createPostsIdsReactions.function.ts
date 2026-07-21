// reactions — Endpoints for creating, getting and removing emoji reactions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreatePostsIdsReactionsInput = z.object({
  body: z.array(z.string()),
})

export const CreatePostsIdsReactionsOutput = z.record(z.string(), z.array(z.object({
  user_id: z.string().optional().describe("The ID of the user that made this reaction"),
  post_id: z.string().optional().describe("The ID of the post to which this reaction was made"),
  emoji_name: z.string().optional().describe("The name of the emoji that was used for this reaction"),
  create_at: z.number().int().optional().describe("The time in milliseconds this reaction was made"),
})))

export const createPostsIdsReactions = pikkuSessionlessFunc({
  description: "Get a list of reactions made by all users to a given post.\n##### Permissions\nMust have `read_channel` permission for the channel the post is in.\n\n__Minimum server version__: 5.8",
  input: CreatePostsIdsReactionsInput,
  output: CreatePostsIdsReactionsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/posts/ids/reactions", data) as any
  },
})

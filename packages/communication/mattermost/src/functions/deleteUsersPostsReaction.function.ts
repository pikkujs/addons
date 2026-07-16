// reactions — Endpoints for creating, getting and removing emoji reactions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const DeleteUsersPostsReactionInput = z.object({
  user_id: z.string().describe("ID of the user"),
  post_id: z.string().describe("ID of the post"),
  emoji_name: z.string().describe("emoji name"),
})

export const DeleteUsersPostsReactionOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteUsersPostsReaction = pikkuSessionlessFunc({
  description: "Deletes a reaction made by a user from the given post.\n##### Permissions\nMust be user or have `manage_system` permission.",
  input: DeleteUsersPostsReactionInput,
  output: DeleteUsersPostsReactionOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/users/{user_id}/posts/{post_id}/reactions/{emoji_name}", data) as any
  },
})

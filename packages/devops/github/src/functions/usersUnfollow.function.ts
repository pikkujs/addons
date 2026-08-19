// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UsersUnfollowInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
})

export const usersUnfollow = pikkuSessionlessFunc({
  description: "Unfollowing a user requires the user to be logged in and authenticated with basic auth or OAuth with the `user:follow` scope.",
  input: UsersUnfollowInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/following/{username}", data)
  },
})

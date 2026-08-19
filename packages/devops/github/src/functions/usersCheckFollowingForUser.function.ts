// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const UsersCheckFollowingForUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
  target_user: z.string(),
})

export const usersCheckFollowingForUser = pikkuSessionlessFunc({
  input: UsersCheckFollowingForUserInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/following/{target_user}", data)
  },
})

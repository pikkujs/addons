// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UsersUnblockInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
})

export const usersUnblock = pikkuSessionlessFunc({
  input: UsersUnblockInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/blocks/{username}", data)
  },
})

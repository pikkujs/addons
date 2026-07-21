// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const UsersBlockInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
})

export const usersBlock = pikkuSessionlessFunc({
  input: UsersBlockInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/user/blocks/{username}", data)
  },
})

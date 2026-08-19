// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const UsersDeleteEmailForAuthenticatedUserInput = z.object({
  body: z.union([z.object({
  emails: z.array(z.string()).describe("Email addresses associated with the GitHub user account."),
}), z.array(z.string()), z.string()]),
})

export const usersDeleteEmailForAuthenticatedUser = pikkuSessionlessFunc({
  description: "This endpoint is accessible with the `user` scope.",
  input: UsersDeleteEmailForAuthenticatedUserInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/emails", data)
  },
})

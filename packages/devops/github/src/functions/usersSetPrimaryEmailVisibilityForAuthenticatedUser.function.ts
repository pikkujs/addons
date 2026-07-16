// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const UsersSetPrimaryEmailVisibilityForAuthenticatedUserInput = z.object({
  visibility: z.enum(["public", "private"]).describe("Denotes whether an email is publicly visible."),
})

export const UsersSetPrimaryEmailVisibilityForAuthenticatedUserOutput = z.array(z.object({
  email: z.string().email(),
  primary: z.boolean(),
  verified: z.boolean(),
  visibility: z.string().nullable(),
}))

export const usersSetPrimaryEmailVisibilityForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Sets the visibility for your primary email addresses.",
  input: UsersSetPrimaryEmailVisibilityForAuthenticatedUserInput,
  output: UsersSetPrimaryEmailVisibilityForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/user/email/visibility", data) as any
  },
})

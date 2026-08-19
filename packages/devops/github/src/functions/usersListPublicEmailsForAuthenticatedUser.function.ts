// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UsersListPublicEmailsForAuthenticatedUserInput = z.object({
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const UsersListPublicEmailsForAuthenticatedUserOutput = z.array(z.object({
  email: z.string().email(),
  primary: z.boolean(),
  verified: z.boolean(),
  visibility: z.string().nullable(),
}))

export const usersListPublicEmailsForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Lists your publicly visible email address, which you can set with the [Set primary email visibility for the authenticated user](https://docs.github.com/rest/reference/users#set-primary-email-visibility-for-the-authenticated-user) endpoint. This endpoint is accessible with the `user:email` scope.",
  input: UsersListPublicEmailsForAuthenticatedUserInput,
  output: UsersListPublicEmailsForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/public_emails", data) as any
  },
})

// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UsersListEmailsForAuthenticatedUserInput = z.object({
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const UsersListEmailsForAuthenticatedUserOutput = z.array(z.object({
  email: z.string().email(),
  primary: z.boolean(),
  verified: z.boolean(),
  visibility: z.string().nullable(),
}))

export const usersListEmailsForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Lists all of your email addresses, and specifies which one is visible to the public. This endpoint is accessible with the `user:email` scope.",
  input: UsersListEmailsForAuthenticatedUserInput,
  output: UsersListEmailsForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/emails", data) as any
  },
})

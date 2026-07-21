// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const UsersAddEmailForAuthenticatedUserInput = z.object({
  body: z.union([z.object({
  emails: z.array(z.string()).describe("Adds one or more email addresses to your GitHub account. Must contain at least one email address. **Note:** Alternatively, you can pass a single email address or an `array` of emails addresses directly, but we recommend that you pass an object using the `emails` key."),
}), z.array(z.string()), z.string()]),
})

export const UsersAddEmailForAuthenticatedUserOutput = z.array(z.object({
  email: z.string().email(),
  primary: z.boolean(),
  verified: z.boolean(),
  visibility: z.string().nullable(),
}))

export const usersAddEmailForAuthenticatedUser = pikkuSessionlessFunc({
  description: "This endpoint is accessible with the `user` scope.",
  input: UsersAddEmailForAuthenticatedUserInput,
  output: UsersAddEmailForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/user/emails", data) as any
  },
})

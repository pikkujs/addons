// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const UsersCreatePublicSshKeyForAuthenticatedUserInput = z.object({
  key: z.string().regex(new RegExp("^ssh-(rsa|dss|ed25519) |^ecdsa-sha2-nistp(256|384|521) ")).describe("The public SSH key to add to your GitHub account."),
  title: z.string().optional().describe("A descriptive name for the new key."),
})

export const UsersCreatePublicSshKeyForAuthenticatedUserOutput = z.object({
  created_at: z.string().datetime(),
  id: z.number().int(),
  key: z.string(),
  read_only: z.boolean(),
  title: z.string(),
  url: z.string(),
  verified: z.boolean(),
}).describe("Key")

export const usersCreatePublicSshKeyForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Adds a public SSH key to the authenticated user's GitHub account. Requires that you are authenticated via Basic Auth, or OAuth with at least `write:public_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).",
  input: UsersCreatePublicSshKeyForAuthenticatedUserInput,
  output: UsersCreatePublicSshKeyForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/user/keys", data) as any
  },
})

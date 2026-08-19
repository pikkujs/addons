// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UsersGetPublicSshKeyForAuthenticatedUserInput = z.object({
  key_id: z.number().int().describe("The unique identifier of the key."),
})

export const UsersGetPublicSshKeyForAuthenticatedUserOutput = z.object({
  created_at: z.string().datetime(),
  id: z.number().int(),
  key: z.string(),
  read_only: z.boolean(),
  title: z.string(),
  url: z.string(),
  verified: z.boolean(),
}).describe("Key")

export const usersGetPublicSshKeyForAuthenticatedUser = pikkuSessionlessFunc({
  description: "View extended details for a single public SSH key. Requires that you are authenticated via Basic Auth or via OAuth with at least `read:public_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).",
  input: UsersGetPublicSshKeyForAuthenticatedUserInput,
  output: UsersGetPublicSshKeyForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/keys/{key_id}", data) as any
  },
})

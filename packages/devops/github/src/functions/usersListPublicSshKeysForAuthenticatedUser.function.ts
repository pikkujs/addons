// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UsersListPublicSshKeysForAuthenticatedUserInput = z.object({
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const UsersListPublicSshKeysForAuthenticatedUserOutput = z.array(z.object({
  created_at: z.string().datetime(),
  id: z.number().int(),
  key: z.string(),
  read_only: z.boolean(),
  title: z.string(),
  url: z.string(),
  verified: z.boolean(),
}))

export const usersListPublicSshKeysForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Lists the public SSH keys for the authenticated user's GitHub account. Requires that you are authenticated via Basic Auth or via OAuth with at least `read:public_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).",
  input: UsersListPublicSshKeysForAuthenticatedUserInput,
  output: UsersListPublicSshKeysForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/keys", data) as any
  },
})

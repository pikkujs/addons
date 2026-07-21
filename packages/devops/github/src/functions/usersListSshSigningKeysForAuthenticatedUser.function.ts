// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UsersListSshSigningKeysForAuthenticatedUserInput = z.object({
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const UsersListSshSigningKeysForAuthenticatedUserOutput = z.array(z.object({
  created_at: z.string().datetime(),
  id: z.number().int(),
  key: z.string(),
  title: z.string(),
}))

export const usersListSshSigningKeysForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Lists the SSH signing keys for the authenticated user's GitHub account. You must authenticate with Basic Authentication, or you must authenticate with OAuth with at least `read:ssh_signing_key` scope. For more information, see \"[Understanding scopes for OAuth apps](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).\"",
  input: UsersListSshSigningKeysForAuthenticatedUserInput,
  output: UsersListSshSigningKeysForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/ssh_signing_keys", data) as any
  },
})

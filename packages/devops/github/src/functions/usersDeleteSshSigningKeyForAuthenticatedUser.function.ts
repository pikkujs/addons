// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UsersDeleteSshSigningKeyForAuthenticatedUserInput = z.object({
  ssh_signing_key_id: z.number().int().describe("The unique identifier of the SSH signing key."),
})

export const usersDeleteSshSigningKeyForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Deletes an SSH signing key from the authenticated user's GitHub account. You must authenticate with Basic Authentication, or you must authenticate with OAuth with at least `admin:ssh_signing_key` scope. For more information, see \"[Understanding scopes for OAuth apps](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).\"",
  input: UsersDeleteSshSigningKeyForAuthenticatedUserInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/ssh_signing_keys/{ssh_signing_key_id}", data)
  },
})

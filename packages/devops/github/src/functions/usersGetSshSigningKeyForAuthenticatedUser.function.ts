// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UsersGetSshSigningKeyForAuthenticatedUserInput = z.object({
  ssh_signing_key_id: z.number().int().describe("The unique identifier of the SSH signing key."),
})

export const UsersGetSshSigningKeyForAuthenticatedUserOutput = z.object({
  created_at: z.string().datetime(),
  id: z.number().int(),
  key: z.string(),
  title: z.string(),
}).describe("A public SSH key used to sign Git commits")

export const usersGetSshSigningKeyForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Gets extended details for an SSH signing key. You must authenticate with Basic Authentication, or you must authenticate with OAuth with at least `read:ssh_signing_key` scope. For more information, see \"[Understanding scopes for OAuth apps](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).\"",
  input: UsersGetSshSigningKeyForAuthenticatedUserInput,
  output: UsersGetSshSigningKeyForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/ssh_signing_keys/{ssh_signing_key_id}", data) as any
  },
})

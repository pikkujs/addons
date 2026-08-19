// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const UsersCreateSshSigningKeyForAuthenticatedUserInput = z.object({
  key: z.string().regex(new RegExp("^ssh-(rsa|dss|ed25519) |^ecdsa-sha2-nistp(256|384|521) |^(sk-ssh-ed25519|sk-ecdsa-sha2-nistp256)@openssh.com ")).describe("The public SSH key to add to your GitHub account. For more information, see \"[Checking for existing SSH keys](https://docs.github.com/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys).\""),
  title: z.string().optional().describe("A descriptive name for the new key."),
})

export const UsersCreateSshSigningKeyForAuthenticatedUserOutput = z.object({
  created_at: z.string().datetime(),
  id: z.number().int(),
  key: z.string(),
  title: z.string(),
}).describe("A public SSH key used to sign Git commits")

export const usersCreateSshSigningKeyForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Creates an SSH signing key for the authenticated user's GitHub account. You must authenticate with Basic Authentication, or you must authenticate with OAuth with at least `write:ssh_signing_key` scope. For more information, see \"[Understanding scopes for OAuth apps](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).\"",
  input: UsersCreateSshSigningKeyForAuthenticatedUserInput,
  output: UsersCreateSshSigningKeyForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/user/ssh_signing_keys", data) as any
  },
})

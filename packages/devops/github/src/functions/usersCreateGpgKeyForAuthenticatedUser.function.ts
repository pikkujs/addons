// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const UsersCreateGpgKeyForAuthenticatedUserInput = z.object({
  armored_public_key: z.string().describe("A GPG key in ASCII-armored format."),
  name: z.string().optional().describe("A descriptive name for the new key."),
})

export const UsersCreateGpgKeyForAuthenticatedUserOutput = z.object({
  can_certify: z.boolean(),
  can_encrypt_comms: z.boolean(),
  can_encrypt_storage: z.boolean(),
  can_sign: z.boolean(),
  created_at: z.string().datetime(),
  emails: z.array(z.object({
    email: z.string().optional(),
    verified: z.boolean().optional(),
  })),
  expires_at: z.string().datetime().nullable(),
  id: z.number().int(),
  key_id: z.string(),
  name: z.string().nullable().optional(),
  primary_key_id: z.number().int().nullable(),
  public_key: z.string(),
  raw_key: z.string().nullable(),
  revoked: z.boolean(),
  subkeys: z.array(z.object({
    can_certify: z.boolean().optional(),
    can_encrypt_comms: z.boolean().optional(),
    can_encrypt_storage: z.boolean().optional(),
    can_sign: z.boolean().optional(),
    created_at: z.string().optional(),
    emails: z.array(z.unknown()).optional(),
    expires_at: z.string().nullable().optional(),
    id: z.number().int().optional(),
    key_id: z.string().optional(),
    primary_key_id: z.number().int().optional(),
    public_key: z.string().optional(),
    raw_key: z.string().nullable().optional(),
    revoked: z.boolean().optional(),
    subkeys: z.array(z.unknown()).optional(),
  })),
}).describe("A unique encryption key")

export const usersCreateGpgKeyForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Adds a GPG key to the authenticated user's GitHub account. Requires that you are authenticated via Basic Auth, or OAuth with at least `write:gpg_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).",
  input: UsersCreateGpgKeyForAuthenticatedUserInput,
  output: UsersCreateGpgKeyForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/user/gpg_keys", data) as any
  },
})

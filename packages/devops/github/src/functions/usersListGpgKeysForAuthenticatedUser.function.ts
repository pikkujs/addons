// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UsersListGpgKeysForAuthenticatedUserInput = z.object({
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const UsersListGpgKeysForAuthenticatedUserOutput = z.array(z.object({
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
}))

export const usersListGpgKeysForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Lists the current user's GPG keys. Requires that you are authenticated via Basic Auth or via OAuth with at least `read:gpg_key` [scope](https://docs.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/).",
  input: UsersListGpgKeysForAuthenticatedUserInput,
  output: UsersListGpgKeysForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/gpg_keys", data) as any
  },
})

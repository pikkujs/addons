// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UsersListSshSigningKeysForUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const UsersListSshSigningKeysForUserOutput = z.array(z.object({
  created_at: z.string().datetime(),
  id: z.number().int(),
  key: z.string(),
  title: z.string(),
}))

export const usersListSshSigningKeysForUser = pikkuSessionlessFunc({
  description: "Lists the SSH signing keys for a user. This operation is accessible by anyone.",
  input: UsersListSshSigningKeysForUserInput,
  output: UsersListSshSigningKeysForUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/ssh_signing_keys", data) as any
  },
})

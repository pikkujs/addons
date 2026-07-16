// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UsersListPublicKeysForUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const UsersListPublicKeysForUserOutput = z.array(z.object({
  id: z.number().int(),
  key: z.string(),
}))

export const usersListPublicKeysForUser = pikkuSessionlessFunc({
  description: "Lists the _verified_ public SSH keys for a user. This is accessible by anyone.",
  input: UsersListPublicKeysForUserInput,
  output: UsersListPublicKeysForUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/keys", data) as any
  },
})

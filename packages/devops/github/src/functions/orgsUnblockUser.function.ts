// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrgsUnblockUserInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const orgsUnblockUser = pikkuSessionlessFunc({
  input: OrgsUnblockUserInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/blocks/{username}", data)
  },
})

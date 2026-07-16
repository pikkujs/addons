// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrgsRemovePublicMembershipForAuthenticatedUserInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const orgsRemovePublicMembershipForAuthenticatedUser = pikkuSessionlessFunc({
  input: OrgsRemovePublicMembershipForAuthenticatedUserInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/public_members/{username}", data)
  },
})

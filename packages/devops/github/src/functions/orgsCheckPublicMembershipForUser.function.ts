// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const OrgsCheckPublicMembershipForUserInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const orgsCheckPublicMembershipForUser = pikkuSessionlessFunc({
  input: OrgsCheckPublicMembershipForUserInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/public_members/{username}", data)
  },
})

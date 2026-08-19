// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const OrgsCheckMembershipForUserInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const orgsCheckMembershipForUser = pikkuSessionlessFunc({
  description: "Check if a user is, publicly or privately, a member of the organization.",
  input: OrgsCheckMembershipForUserInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/members/{username}", data)
  },
})

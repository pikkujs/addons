// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError } from '@pikku/core/errors'

export const OrgsRemoveMemberInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const orgsRemoveMember = pikkuSessionlessFunc({
  description: "Removing a user from this list will remove them from all teams and they will no longer have any access to the organization's repositories.",
  input: OrgsRemoveMemberInput,
  errors: [ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/members/{username}", data)
  },
})

// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const OrgsRemoveMembershipForUserInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const orgsRemoveMembershipForUser = pikkuSessionlessFunc({
  description: "In order to remove a user's membership with an organization, the authenticated user must be an organization owner.\n\nIf the specified user is an active member of the organization, this will remove them from the organization. If the specified user has been invited to the organization, this will cancel their invitation. The specified user will receive an email notification in both cases.",
  input: OrgsRemoveMembershipForUserInput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/memberships/{username}", data)
  },
})

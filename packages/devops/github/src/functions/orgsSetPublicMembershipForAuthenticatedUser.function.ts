// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError } from '@pikku/core/errors'

export const OrgsSetPublicMembershipForAuthenticatedUserInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const orgsSetPublicMembershipForAuthenticatedUser = pikkuSessionlessFunc({
  description: "The user can publicize their own membership. (A user cannot publicize the membership for another user.)\n\nNote that you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see \"[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs).\"",
  input: OrgsSetPublicMembershipForAuthenticatedUserInput,
  errors: [ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/public_members/{username}", data)
  },
})

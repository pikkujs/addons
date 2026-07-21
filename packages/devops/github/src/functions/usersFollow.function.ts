// users — Interact with and view information about users and also current user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UsersFollowInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
})

export const usersFollow = pikkuSessionlessFunc({
  description: "Note that you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see \"[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs).\"\n\nFollowing a user requires the user to be logged in and authenticated with basic auth or OAuth with the `user:follow` scope.",
  input: UsersFollowInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/user/following/{username}", data)
  },
})

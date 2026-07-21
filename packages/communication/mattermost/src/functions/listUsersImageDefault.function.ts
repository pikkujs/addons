// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListUsersImageDefaultInput = z.object({
  user_id: z.string().describe("User GUID"),
})

export const listUsersImageDefault = pikkuSessionlessFunc({
  description: "Returns the default (generated) user profile image based on user_id string parameter.\n##### Permissions\nMust be logged in.\n__Minimum server version__: 5.5",
  input: ListUsersImageDefaultInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/image/default", data)
  },
})

// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListUsersStatsOutput = z.object({
  total_users_count: z.number().int().optional(),
})

export const listUsersStats = pikkuSessionlessFunc({
  description: "Get a total count of users in the system.\n##### Permissions\nMust be authenticated.",
  output: ListUsersStatsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }) => {
    return mattermost.call("GET", "/users/stats") as any
  },
})

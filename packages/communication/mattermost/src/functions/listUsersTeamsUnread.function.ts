// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListUsersTeamsUnreadInput = z.object({
  user_id: z.string().describe("User GUID"),
  exclude_team: z.string().describe("Optional team id to be excluded from the results"),
})

export const ListUsersTeamsUnreadOutput = z.array(z.object({
  team_id: z.string().optional(),
  msg_count: z.number().int().optional(),
  mention_count: z.number().int().optional(),
}))

export const listUsersTeamsUnread = pikkuSessionlessFunc({
  description: "Get the count for unread messages and mentions in the teams the user is a member of.\n##### Permissions\nMust be logged in.",
  input: ListUsersTeamsUnreadInput,
  output: ListUsersTeamsUnreadOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/teams/unread", data) as any
  },
})

// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListUsersTeamsUnread2Input = z.object({
  user_id: z.string().describe("User GUID"),
  team_id: z.string().describe("Team GUID"),
})

export const ListUsersTeamsUnread2Output = z.object({
  team_id: z.string().optional(),
  msg_count: z.number().int().optional(),
  mention_count: z.number().int().optional(),
})

export const listUsersTeamsUnread2 = pikkuSessionlessFunc({
  description: "Get the unread mention and message counts for a team for the specified user.\n##### Permissions\nMust be the user or have `edit_other_users` permission and have `view_team` permission for the team.",
  input: ListUsersTeamsUnread2Input,
  output: ListUsersTeamsUnread2Output,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/teams/{team_id}/unread", data) as any
  },
})

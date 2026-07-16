// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListUsersTeamsChannelsInput = z.object({
  user_id: z.string().describe("User GUID"),
  team_id: z.string().describe("Team GUID"),
})

export const ListUsersTeamsChannelsOutput = z.array(z.object({
  id: z.string().optional(),
  create_at: z.number().int().optional().describe("The time in milliseconds a channel was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a channel was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a channel was deleted"),
  team_id: z.string().optional(),
  type: z.string().optional(),
  display_name: z.string().optional(),
  name: z.string().optional(),
  header: z.string().optional(),
  purpose: z.string().optional(),
  last_post_at: z.number().int().optional().describe("The time in milliseconds of the last post of a channel"),
  total_msg_count: z.number().int().optional(),
  extra_update_at: z.number().int().optional().describe("Deprecated in Mattermost 5.0 release"),
  creator_id: z.string().optional(),
}))

export const listUsersTeamsChannels = pikkuSessionlessFunc({
  description: "Get all the channels on a team for a user.\n##### Permissions\nLogged in as the user, or have `edit_other_users` permission, and `view_team` permission for the team.",
  input: ListUsersTeamsChannelsInput,
  output: ListUsersTeamsChannelsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/teams/{team_id}/channels", data) as any
  },
})

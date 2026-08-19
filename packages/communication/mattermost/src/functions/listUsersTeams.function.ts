// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListUsersTeamsInput = z.object({
  user_id: z.string().describe("User GUID"),
})

export const ListUsersTeamsOutput = z.array(z.object({
  id: z.string().optional(),
  create_at: z.number().int().optional().describe("The time in milliseconds a team was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a team was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a team was deleted"),
  display_name: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  email: z.string().optional(),
  type: z.string().optional(),
  allowed_domains: z.string().optional(),
  invite_id: z.string().optional(),
  allow_open_invite: z.boolean().optional(),
}))

export const listUsersTeams = pikkuSessionlessFunc({
  description: "Get a list of teams that a user is on.\n##### Permissions\nMust be authenticated as the user or have the `manage_system` permission.",
  input: ListUsersTeamsInput,
  output: ListUsersTeamsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/teams", data) as any
  },
})

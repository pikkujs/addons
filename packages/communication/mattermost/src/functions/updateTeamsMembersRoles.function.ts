// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateTeamsMembersRolesInput = z.object({
  team_id: z.string().describe("Team GUID"),
  user_id: z.string().describe("User GUID"),
  roles: z.string(),
})

export const UpdateTeamsMembersRolesOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateTeamsMembersRoles = pikkuSessionlessFunc({
  description: "Update a team member roles. Valid team roles are \"team_user\", \"team_admin\" or both of them. Overwrites any previously assigned team roles.\n##### Permissions\nMust be authenticated and have the `manage_team_roles` permission.",
  input: UpdateTeamsMembersRolesInput,
  output: UpdateTeamsMembersRolesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/teams/{team_id}/members/{user_id}/roles", data) as any
  },
})

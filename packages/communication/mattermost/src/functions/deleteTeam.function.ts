// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteTeamInput = z.object({
  team_id: z.string().describe("Team GUID"),
  permanent: z.boolean().optional().default(false).describe("Permanently delete the team, to be used for compliance reasons only. As of server version 5.0, `ServiceSettings.EnableAPITeamDeletion` must be set to `true` in the server's configuration."),
})

export const DeleteTeamOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteTeam = pikkuSessionlessFunc({
  description: "Soft deletes a team, by marking the team as deleted in the database. Soft deleted teams will not be accessible in the user interface.\n\nOptionally use the permanent query parameter to hard delete the team for compliance reasons. As of server version 5.0, to use this feature `ServiceSettings.EnableAPITeamDeletion` must be set to `true` in the server's configuration.\n##### Permissions\nMust have the `manage_team` permission.",
  input: DeleteTeamInput,
  output: DeleteTeamOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/teams/{team_id}", data) as any
  },
})

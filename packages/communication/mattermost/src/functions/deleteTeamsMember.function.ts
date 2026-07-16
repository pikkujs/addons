// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteTeamsMemberInput = z.object({
  team_id: z.string().describe("Team GUID"),
  user_id: z.string().describe("User GUID"),
})

export const DeleteTeamsMemberOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteTeamsMember = pikkuSessionlessFunc({
  description: "Delete the team member object for a user, effectively removing them from a team.\n##### Permissions\nMust be logged in as the user or have the `remove_user_from_team` permission.",
  input: DeleteTeamsMemberInput,
  output: DeleteTeamsMemberOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/teams/{team_id}/members/{user_id}", data) as any
  },
})

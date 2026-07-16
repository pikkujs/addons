// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError } from '@pikku/core/errors'

export const DeleteTeamsImageInput = z.object({
  team_id: z.string().describe("Team GUID"),
})

export const DeleteTeamsImageOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteTeamsImage = pikkuSessionlessFunc({
  description: "Remove the team icon for the team.\n\n__Minimum server version__: 4.10\n\n##### Permissions\nMust be authenticated and have the `manage_team` permission.",
  input: DeleteTeamsImageInput,
  output: DeleteTeamsImageOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/teams/{team_id}/image", data) as any
  },
})

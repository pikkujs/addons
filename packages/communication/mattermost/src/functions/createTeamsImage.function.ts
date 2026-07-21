// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError } from '@pikku/core/errors'

export const CreateTeamsImageInput = z.object({
  team_id: z.string().describe("Team GUID"),
})

export const CreateTeamsImageOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createTeamsImage = pikkuSessionlessFunc({
  description: "Sets the team icon for the team.\n\n__Minimum server version__: 4.9\n\n##### Permissions\nMust be authenticated and have the `manage_team` permission.",
  input: CreateTeamsImageInput,
  output: CreateTeamsImageOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/teams/{team_id}/image", data) as any
  },
})

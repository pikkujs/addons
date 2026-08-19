// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const UpdateTeamsSchemeInput = z.object({
  team_id: z.string().describe("Team GUID"),
  scheme_id: z.string().describe("The ID of the scheme."),
})

export const UpdateTeamsSchemeOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateTeamsScheme = pikkuSessionlessFunc({
  description: "Set a team's scheme, more specifically sets the scheme_id value of a team record.\n\n##### Permissions\nMust have `manage_system` permission.\n\n__Minimum server version__: 5.0",
  input: UpdateTeamsSchemeInput,
  output: UpdateTeamsSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/teams/{team_id}/scheme", data) as any
  },
})

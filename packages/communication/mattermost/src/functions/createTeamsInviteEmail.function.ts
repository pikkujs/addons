// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateTeamsInviteEmailInput = z.object({
  team_id: z.string().describe("Team GUID"),
  body: z.array(z.string()),
})

export const CreateTeamsInviteEmailOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createTeamsInviteEmail = pikkuSessionlessFunc({
  description: "Invite users to the existing team usign the user's email.\n##### Permissions\nMust have `invite_to_team` permission for the team.",
  input: CreateTeamsInviteEmailInput,
  output: CreateTeamsInviteEmailOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/teams/{team_id}/invite/email", data) as any
  },
})

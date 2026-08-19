// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const DeleteTeamsInvitesEmailOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteTeamsInvitesEmail = pikkuSessionlessFunc({
  description: "Invalidate active email invitations that have not been accepted by the user.\n##### Permissions\nMust have `manage_system` permission.",
  output: DeleteTeamsInvitesEmailOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("DELETE", "/teams/invites/email") as any
  },
})

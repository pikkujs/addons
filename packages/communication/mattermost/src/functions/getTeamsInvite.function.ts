// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const GetTeamsInviteInput = z.object({
  invite_id: z.string().describe("Invite id for a team"),
})

export const GetTeamsInviteOutput = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  display_name: z.string().optional(),
  description: z.string().optional(),
})

export const getTeamsInvite = pikkuSessionlessFunc({
  description: "Get the `name`, `display_name`, `description` and `id` for a team from the invite id.\n\n__Minimum server version__: 4.0\n\n##### Permissions\nNo authentication required.",
  input: GetTeamsInviteInput,
  output: GetTeamsInviteOutput,
  errors: [BadRequestError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/teams/invite/{invite_id}", data) as any
  },
})

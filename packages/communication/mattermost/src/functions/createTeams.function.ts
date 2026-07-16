// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateTeamsInput = z.object({
  name: z.string().describe("Unique handler for a team, will be present in the team URL"),
  display_name: z.string().describe("Non-unique UI name for the team"),
  type: z.string().describe("`'O'` for open, `'I'` for invite only"),
})

export const CreateTeamsOutput = z.object({
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
})

export const createTeams = pikkuSessionlessFunc({
  description: "Create a new team on the system.\n##### Permissions\nMust be authenticated and have the `create_team` permission.",
  input: CreateTeamsInput,
  output: CreateTeamsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/teams", data) as any
  },
})

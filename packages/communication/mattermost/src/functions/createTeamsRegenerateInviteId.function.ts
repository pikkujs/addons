// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CreateTeamsRegenerateInviteIdInput = z.object({
  team_id: z.string().describe("Team GUID"),
})

export const CreateTeamsRegenerateInviteIdOutput = z.object({
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

export const createTeamsRegenerateInviteId = pikkuSessionlessFunc({
  description: "Regenerates the invite ID used in invite links of a team\n##### Permissions\nMust be authenticated and have the `manage_team` permission.",
  input: CreateTeamsRegenerateInviteIdInput,
  output: CreateTeamsRegenerateInviteIdOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/teams/{team_id}/regenerate_invite_id", data) as any
  },
})

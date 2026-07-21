// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateTeamInput = z.object({
  team_id: z.string().describe("Team GUID"),
  id: z.string(),
  display_name: z.string(),
  description: z.string(),
  company_name: z.string(),
  allowed_domains: z.string(),
  invite_id: z.string(),
  allow_open_invite: z.string(),
})

export const UpdateTeamOutput = z.object({
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

export const updateTeam = pikkuSessionlessFunc({
  description: "Update a team by providing the team object. The fields that can be updated are defined in the request body, all other provided fields will be ignored.\n##### Permissions\nMust have the `manage_team` permission.",
  input: UpdateTeamInput,
  output: UpdateTeamOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/teams/{team_id}", data) as any
  },
})

// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListTeamsStatsInput = z.object({
  team_id: z.string().describe("Team GUID"),
})

export const ListTeamsStatsOutput = z.object({
  team_id: z.string().optional(),
  total_member_count: z.number().int().optional(),
  active_member_count: z.number().int().optional(),
})

export const listTeamsStats = pikkuSessionlessFunc({
  description: "Get a team stats on the system.\n##### Permissions\nMust be authenticated and have the `view_team` permission.",
  input: ListTeamsStatsInput,
  output: ListTeamsStatsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/teams/{team_id}/stats", data) as any
  },
})

// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const CreateTeamsImportInput = z.object({
  team_id: z.string().describe("Team GUID"),
})

export const CreateTeamsImportOutput = z.object({
  results: z.string().optional(),
})

export const createTeamsImport = pikkuSessionlessFunc({
  description: "Import a team into a existing team. Import users, channels, posts, hooks.\n##### Permissions\nMust have `permission_import_team` permission.",
  input: CreateTeamsImportInput,
  output: CreateTeamsImportOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/teams/{team_id}/import", data) as any
  },
})

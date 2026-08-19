// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const ListTeamsNameExistsInput = z.object({
  name: z.string().describe("Team Name"),
})

export const ListTeamsNameExistsOutput = z.object({
  exists: z.boolean().optional(),
})

export const listTeamsNameExists = pikkuSessionlessFunc({
  description: "Check if the team exists based on a team name.\n##### Permissions\nMust be authenticated.",
  input: ListTeamsNameExistsInput,
  output: ListTeamsNameExistsOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/teams/name/{name}/exists", data) as any
  },
})

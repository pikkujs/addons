// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListTeamsImageInput = z.object({
  team_id: z.string().describe("Team GUID"),
})

export const listTeamsImage = pikkuSessionlessFunc({
  description: "Get the team icon of the team.\n\n__Minimum server version__: 4.9\n\n##### Permissions\nUser must be authenticated. In addition, team must be open or the user must have the `view_team` permission.",
  input: ListTeamsImageInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/teams/{team_id}/image", data)
  },
})

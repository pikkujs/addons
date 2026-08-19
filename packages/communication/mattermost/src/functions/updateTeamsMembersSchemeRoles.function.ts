// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateTeamsMembersSchemeRolesInput = z.object({
  team_id: z.string().describe("Team GUID"),
  user_id: z.string().describe("User GUID"),
  scheme_admin: z.boolean(),
  scheme_user: z.boolean(),
})

export const UpdateTeamsMembersSchemeRolesOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateTeamsMembersSchemeRoles = pikkuSessionlessFunc({
  description: "Update a team member's scheme_admin/scheme_user properties. Typically this should either be `scheme_admin=false, scheme_user=true` for ordinary team member, or `scheme_admin=true, scheme_user=true` for a team admin.\n\n__Minimum server version__: 5.0\n\n##### Permissions\nMust be authenticated and have the `manage_team_roles` permission.",
  input: UpdateTeamsMembersSchemeRolesInput,
  output: UpdateTeamsMembersSchemeRolesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/teams/{team_id}/members/{user_id}/schemeRoles", data) as any
  },
})

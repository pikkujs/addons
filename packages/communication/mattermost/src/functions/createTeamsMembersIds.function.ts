// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateTeamsMembersIdsInput = z.object({
  team_id: z.string().describe("Team GUID"),
  body: z.array(z.string()),
})

export const CreateTeamsMembersIdsOutput = z.array(z.object({
  team_id: z.string().optional().describe("The ID of the team this member belongs to."),
  user_id: z.string().optional().describe("The ID of the user this member relates to."),
  roles: z.string().optional().describe("The complete list of roles assigned to this team member, as a space-separated list of role names, including any roles granted implicitly through permissions schemes."),
  delete_at: z.number().int().optional().describe("The time in milliseconds that this team member was deleted."),
  scheme_user: z.boolean().optional().describe("Whether this team member holds the default user role defined by the team's permissions scheme."),
  scheme_admin: z.boolean().optional().describe("Whether this team member holds the default admin role defined by the team's permissions scheme."),
  explicit_roles: z.string().optional().describe("The list of roles explicitly assigned to this team member, as a space separated list of role names. This list does *not* include any roles granted implicitly through permissions schemes."),
}))

export const createTeamsMembersIds = pikkuSessionlessFunc({
  description: "Get a list of team members based on a provided array of user ids.\n##### Permissions\nMust have `view_team` permission for the team.",
  input: CreateTeamsMembersIdsInput,
  output: CreateTeamsMembersIdsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/teams/{team_id}/members/ids", data) as any
  },
})

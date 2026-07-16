// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CreateTeamsMembersInput = z.object({
  team_id: z.string().describe("Team GUID"),
  user_id: z.string().optional(),
})

export const CreateTeamsMembersOutput = z.object({
  team_id: z.string().optional().describe("The ID of the team this member belongs to."),
  user_id: z.string().optional().describe("The ID of the user this member relates to."),
  roles: z.string().optional().describe("The complete list of roles assigned to this team member, as a space-separated list of role names, including any roles granted implicitly through permissions schemes."),
  delete_at: z.number().int().optional().describe("The time in milliseconds that this team member was deleted."),
  scheme_user: z.boolean().optional().describe("Whether this team member holds the default user role defined by the team's permissions scheme."),
  scheme_admin: z.boolean().optional().describe("Whether this team member holds the default admin role defined by the team's permissions scheme."),
  explicit_roles: z.string().optional().describe("The list of roles explicitly assigned to this team member, as a space separated list of role names. This list does *not* include any roles granted implicitly through permissions schemes."),
})

export const createTeamsMembers = pikkuSessionlessFunc({
  description: "Add user to the team by user_id.\n##### Permissions\nMust be authenticated and team be open to add self. For adding another user, authenticated user must have the `add_user_to_team` permission.",
  input: CreateTeamsMembersInput,
  output: CreateTeamsMembersOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/teams/{team_id}/members", data) as any
  },
})

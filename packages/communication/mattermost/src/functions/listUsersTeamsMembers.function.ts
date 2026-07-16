// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListUsersTeamsMembersInput = z.object({
  user_id: z.string().describe("User GUID"),
})

export const ListUsersTeamsMembersOutput = z.array(z.object({
  team_id: z.string().optional().describe("The ID of the team this member belongs to."),
  user_id: z.string().optional().describe("The ID of the user this member relates to."),
  roles: z.string().optional().describe("The complete list of roles assigned to this team member, as a space-separated list of role names, including any roles granted implicitly through permissions schemes."),
  delete_at: z.number().int().optional().describe("The time in milliseconds that this team member was deleted."),
  scheme_user: z.boolean().optional().describe("Whether this team member holds the default user role defined by the team's permissions scheme."),
  scheme_admin: z.boolean().optional().describe("Whether this team member holds the default admin role defined by the team's permissions scheme."),
  explicit_roles: z.string().optional().describe("The list of roles explicitly assigned to this team member, as a space separated list of role names. This list does *not* include any roles granted implicitly through permissions schemes."),
}))

export const listUsersTeamsMembers = pikkuSessionlessFunc({
  description: "Get a list of team members for a user. Useful for getting the ids of teams the user is on and the roles they have in those teams.\n##### Permissions\nMust be logged in as the user or have the `edit_other_users` permission.",
  input: ListUsersTeamsMembersInput,
  output: ListUsersTeamsMembersOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/teams/members", data) as any
  },
})

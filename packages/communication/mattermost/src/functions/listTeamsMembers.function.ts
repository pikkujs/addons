// teams — Endpoints for creating, getting and interacting with teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListTeamsMembersInput = z.object({
  team_id: z.string().describe("Team GUID"),
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of users per page."),
})

export const ListTeamsMembersOutput = z.array(z.object({
  team_id: z.string().optional().describe("The ID of the team this member belongs to."),
  user_id: z.string().optional().describe("The ID of the user this member relates to."),
  roles: z.string().optional().describe("The complete list of roles assigned to this team member, as a space-separated list of role names, including any roles granted implicitly through permissions schemes."),
  delete_at: z.number().int().optional().describe("The time in milliseconds that this team member was deleted."),
  scheme_user: z.boolean().optional().describe("Whether this team member holds the default user role defined by the team's permissions scheme."),
  scheme_admin: z.boolean().optional().describe("Whether this team member holds the default admin role defined by the team's permissions scheme."),
  explicit_roles: z.string().optional().describe("The list of roles explicitly assigned to this team member, as a space separated list of role names. This list does *not* include any roles granted implicitly through permissions schemes."),
}))

export const listTeamsMembers = pikkuSessionlessFunc({
  description: "Get a page team members list based on query string parameters - team id, page and per page.\n##### Permissions\nMust be authenticated and have the `view_team` permission.",
  input: ListTeamsMembersInput,
  output: ListTeamsMembersOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/teams/{team_id}/members", data) as any
  },
})

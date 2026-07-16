// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListUsersSessionsInput = z.object({
  user_id: z.string().describe("User GUID"),
})

export const ListUsersSessionsOutput = z.array(z.object({
  create_at: z.number().int().optional().describe("The time in milliseconds a session was created"),
  device_id: z.string().optional(),
  expires_at: z.number().int().optional().describe("The time in milliseconds a session will expire"),
  id: z.string().optional(),
  is_oauth: z.boolean().optional(),
  last_activity_at: z.number().int().optional().describe("The time in milliseconds of the last activity of a session"),
  props: z.record(z.string(), z.unknown()).optional(),
  roles: z.string().optional(),
  team_members: z.array(z.object({
    team_id: z.string().optional().describe("The ID of the team this member belongs to."),
    user_id: z.string().optional().describe("The ID of the user this member relates to."),
    roles: z.string().optional().describe("The complete list of roles assigned to this team member, as a space-separated list of role names, including any roles granted implicitly through permissions schemes."),
    delete_at: z.number().int().optional().describe("The time in milliseconds that this team member was deleted."),
    scheme_user: z.boolean().optional().describe("Whether this team member holds the default user role defined by the team's permissions scheme."),
    scheme_admin: z.boolean().optional().describe("Whether this team member holds the default admin role defined by the team's permissions scheme."),
    explicit_roles: z.string().optional().describe("The list of roles explicitly assigned to this team member, as a space separated list of role names. This list does *not* include any roles granted implicitly through permissions schemes."),
  })).optional(),
  token: z.string().optional(),
  user_id: z.string().optional(),
}))

export const listUsersSessions = pikkuSessionlessFunc({
  description: "Get a list of sessions by providing the user GUID. Sensitive information will be sanitized out.\n##### Permissions\nMust be logged in as the user being updated or have the `edit_other_users` permission.",
  input: ListUsersSessionsInput,
  output: ListUsersSessionsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/sessions", data) as any
  },
})

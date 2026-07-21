// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const UpdateUsersRolesInput = z.object({
  user_id: z.string().describe("User GUID"),
  roles: z.string(),
})

export const UpdateUsersRolesOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateUsersRoles = pikkuSessionlessFunc({
  description: "Update a user's system-level roles. Valid user roles are \"system_user\", \"system_admin\" or both of them. Overwrites any previously assigned system-level roles.\n##### Permissions\nMust have the `manage_roles` permission.",
  input: UpdateUsersRolesInput,
  output: UpdateUsersRolesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/users/{user_id}/roles", data) as any
  },
})

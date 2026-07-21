// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const UpdateUsersPasswordInput = z.object({
  user_id: z.string().describe("User GUID"),
  current_password: z.string().optional().describe("The current password for the user"),
  new_password: z.string().describe("The new password for the user"),
})

export const UpdateUsersPasswordOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateUsersPassword = pikkuSessionlessFunc({
  description: "Update a user's password. New password must meet password policy set by server configuration. Current password is required if you're updating your own password.\n##### Permissions\nMust be logged in as the user the password is being changed for or have `manage_system` permission.",
  input: UpdateUsersPasswordInput,
  output: UpdateUsersPasswordOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/users/{user_id}/password", data) as any
  },
})

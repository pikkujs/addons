// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const UpdateUsersMfaInput = z.object({
  user_id: z.string().describe("User GUID"),
  activate: z.boolean().describe("Use `true` to activate, `false` to deactivate"),
  code: z.string().optional().describe("The code produced by your MFA client. Required if `activate` is true"),
})

export const UpdateUsersMfaOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateUsersMfa = pikkuSessionlessFunc({
  description: "Activates multi-factor authentication for the user if `activate` is true and a valid `code` is provided. If activate is false, then `code` is not required and multi-factor authentication is disabled for the user.\n##### Permissions\nMust be logged in as the user being updated or have the `edit_other_users` permission.",
  input: UpdateUsersMfaInput,
  output: UpdateUsersMfaOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/users/{user_id}/mfa", data) as any
  },
})

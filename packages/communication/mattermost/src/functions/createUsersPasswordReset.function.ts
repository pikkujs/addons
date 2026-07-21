// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateUsersPasswordResetInput = z.object({
  code: z.string().describe("The recovery code"),
  new_password: z.string().describe("The new password for the user"),
})

export const CreateUsersPasswordResetOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createUsersPasswordReset = pikkuSessionlessFunc({
  description: "Update the password for a user using a one-use, timed recovery code tied to the user's account. Only works for non-SSO users.\n##### Permissions\nNo permissions required.",
  input: CreateUsersPasswordResetInput,
  output: CreateUsersPasswordResetOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/password/reset", data) as any
  },
})

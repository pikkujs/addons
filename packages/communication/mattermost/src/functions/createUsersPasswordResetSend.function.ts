// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateUsersPasswordResetSendInput = z.object({
  email: z.string().describe("The email of the user"),
})

export const CreateUsersPasswordResetSendOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createUsersPasswordResetSend = pikkuSessionlessFunc({
  description: "Send an email containing a link for resetting the user's password. The link will contain a one-use, timed recovery code tied to the user's account. Only works for non-SSO users.\n##### Permissions\nNo permissions required.",
  input: CreateUsersPasswordResetSendInput,
  output: CreateUsersPasswordResetSendOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/password/reset/send", data) as any
  },
})

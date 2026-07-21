// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const CreateUsersEmailVerifySendInput = z.object({
  email: z.string().describe("Email of a user"),
})

export const CreateUsersEmailVerifySendOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createUsersEmailVerifySend = pikkuSessionlessFunc({
  description: "Send an email with a verification link to a user that has an email matching the one in the request body. This endpoint will return success even if the email does not match any users on the system.\n##### Permissions\nNo permissions required.",
  input: CreateUsersEmailVerifySendInput,
  output: CreateUsersEmailVerifySendOutput,
  errors: [BadRequestError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/email/verify/send", data) as any
  },
})

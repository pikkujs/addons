// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const CreateUsersEmailVerifyInput = z.object({
  token: z.string().describe("The token given to validate the email"),
})

export const CreateUsersEmailVerifyOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createUsersEmailVerify = pikkuSessionlessFunc({
  description: "Verify the email used by a user to sign-up their account with.\n##### Permissions\nNo permissions required.",
  input: CreateUsersEmailVerifyInput,
  output: CreateUsersEmailVerifyOutput,
  errors: [BadRequestError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/email/verify", data) as any
  },
})

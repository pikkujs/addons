// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const CreateUsersMfaInput = z.object({
  login_id: z.string().describe("The email or username used to login"),
})

export const CreateUsersMfaOutput = z.object({
  mfa_required: z.boolean().optional().describe("Value will `true` if MFA is active, `false` otherwise"),
})

export const createUsersMfa = pikkuSessionlessFunc({
  description: "Check if a user has multi-factor authentication active on their account by providing a login id. Used to check whether an MFA code needs to be provided when logging in.\n##### Permissions\nNo permission required.",
  input: CreateUsersMfaInput,
  output: CreateUsersMfaOutput,
  errors: [BadRequestError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/mfa", data) as any
  },
})

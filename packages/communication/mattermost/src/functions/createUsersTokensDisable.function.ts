// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateUsersTokensDisableInput = z.object({
  token_id: z.string().describe("The personal access token GUID to disable"),
})

export const CreateUsersTokensDisableOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createUsersTokensDisable = pikkuSessionlessFunc({
  description: "Disable a personal access token and delete any sessions using the token. The token can be re-enabled using `/users/tokens/enable`.\n\n__Minimum server version__: 4.4\n\n##### Permissions\nMust have `revoke_user_access_token` permission. For non-self requests, must also have the `edit_other_users` permission.",
  input: CreateUsersTokensDisableInput,
  output: CreateUsersTokensDisableOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/tokens/disable", data) as any
  },
})

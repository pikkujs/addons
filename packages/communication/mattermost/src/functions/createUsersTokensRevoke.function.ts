// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateUsersTokensRevokeInput = z.object({
  token_id: z.string().describe("The user access token GUID to revoke"),
})

export const CreateUsersTokensRevokeOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createUsersTokensRevoke = pikkuSessionlessFunc({
  description: "Revoke a user access token and delete any sessions using the token.\n\n__Minimum server version__: 4.1\n\n##### Permissions\nMust have `revoke_user_access_token` permission. For non-self requests, must also have the `edit_other_users` permission.",
  input: CreateUsersTokensRevokeInput,
  output: CreateUsersTokensRevokeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/tokens/revoke", data) as any
  },
})

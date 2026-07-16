// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetUsersTokenInput = z.object({
  token_id: z.string().describe("User access token GUID"),
})

export const GetUsersTokenOutput = z.object({
  id: z.string().optional().describe("Unique identifier for the token"),
  user_id: z.string().optional().describe("The user the token authenticates for"),
  description: z.string().optional().describe("A description of the token usage"),
  is_active: z.boolean().optional().describe("Indicates whether the token is active"),
})

export const getUsersToken = pikkuSessionlessFunc({
  description: "Get a user access token. Does not include the actual authentication token.\n\n__Minimum server version__: 4.1\n\n##### Permissions\nMust have `read_user_access_token` permission. For non-self requests, must also have the `edit_other_users` permission.",
  input: GetUsersTokenInput,
  output: GetUsersTokenOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/tokens/{token_id}", data) as any
  },
})

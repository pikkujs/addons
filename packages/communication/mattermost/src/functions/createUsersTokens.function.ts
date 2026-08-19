// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateUsersTokensInput = z.object({
  user_id: z.string().describe("User GUID"),
  description: z.string().describe("A description of the token usage"),
})

export const CreateUsersTokensOutput = z.object({
  id: z.string().optional().describe("Unique identifier for the token"),
  token: z.string().optional().describe("The token used for authentication"),
  user_id: z.string().optional().describe("The user the token authenticates for"),
  description: z.string().optional().describe("A description of the token usage"),
})

export const createUsersTokens = pikkuSessionlessFunc({
  description: "Generate a user access token that can be used to authenticate with the Mattermost REST API.\n\n__Minimum server version__: 4.1\n\n##### Permissions\nMust have `create_user_access_token` permission. For non-self requests, must also have the `edit_other_users` permission.",
  input: CreateUsersTokensInput,
  output: CreateUsersTokensOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/{user_id}/tokens", data) as any
  },
})

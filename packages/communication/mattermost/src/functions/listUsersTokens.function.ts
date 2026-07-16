// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListUsersTokensInput = z.object({
  user_id: z.string().describe("User GUID"),
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of tokens per page."),
})

export const ListUsersTokensOutput = z.array(z.object({
  id: z.string().optional().describe("Unique identifier for the token"),
  user_id: z.string().optional().describe("The user the token authenticates for"),
  description: z.string().optional().describe("A description of the token usage"),
  is_active: z.boolean().optional().describe("Indicates whether the token is active"),
}))

export const listUsersTokens = pikkuSessionlessFunc({
  description: "Get a list of user access tokens for a user. Does not include the actual authentication tokens. Use query parameters for paging.\n\n__Minimum server version__: 4.1\n\n##### Permissions\nMust have `read_user_access_token` permission. For non-self requests, must also have the `edit_other_users` permission.",
  input: ListUsersTokensInput,
  output: ListUsersTokensOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/tokens", data) as any
  },
})

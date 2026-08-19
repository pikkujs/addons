// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateUsersTokensSearchInput = z.object({
  term: z.string().describe("The search term to match against the token id, user id or username."),
})

export const CreateUsersTokensSearchOutput = z.array(z.object({
  id: z.string().optional().describe("Unique identifier for the token"),
  user_id: z.string().optional().describe("The user the token authenticates for"),
  description: z.string().optional().describe("A description of the token usage"),
  is_active: z.boolean().optional().describe("Indicates whether the token is active"),
}))

export const createUsersTokensSearch = pikkuSessionlessFunc({
  description: "Get a list of tokens based on search criteria provided in the request body. Searches are done against the token id, user id and username.\n\n__Minimum server version__: 4.7\n\n##### Permissions\nMust have `manage_system` permission.",
  input: CreateUsersTokensSearchInput,
  output: CreateUsersTokensSearchOutput,
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/tokens/search", data) as any
  },
})

// OAuth — Endpoints for configuring and interacting with Mattermost as an OAuth 2.0 service provider.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListUsersOauthAppsAuthorizedInput = z.object({
  user_id: z.string().describe("User GUID"),
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of apps per page."),
})

export const ListUsersOauthAppsAuthorizedOutput = z.array(z.object({
  id: z.string().optional().describe("The client id of the application"),
  client_secret: z.string().optional().describe("The client secret of the application"),
  name: z.string().optional().describe("The name of the client application"),
  description: z.string().optional().describe("A short description of the application"),
  icon_url: z.string().optional().describe("A URL to an icon to display with the application"),
  callback_urls: z.array(z.string()).optional().describe("A list of callback URLs for the appliation"),
  homepage: z.string().optional().describe("A link to the website of the application"),
  is_trusted: z.boolean().optional().describe("Set this to `true` to skip asking users for permission"),
  create_at: z.number().int().optional().describe("The time of registration for the application"),
  update_at: z.number().int().optional().describe("The last time of update for the application"),
}))

export const listUsersOauthAppsAuthorized = pikkuSessionlessFunc({
  description: "Get a page of OAuth 2.0 client applications authorized to access a user's account.\n##### Permissions\nMust be authenticated as the user or have `edit_other_users` permission.",
  input: ListUsersOauthAppsAuthorizedInput,
  output: ListUsersOauthAppsAuthorizedOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/oauth/apps/authorized", data) as any
  },
})

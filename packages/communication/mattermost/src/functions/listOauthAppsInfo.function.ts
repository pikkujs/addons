// OAuth — Endpoints for configuring and interacting with Mattermost as an OAuth 2.0 service provider.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const ListOauthAppsInfoInput = z.object({
  app_id: z.string().describe("Application client id"),
})

export const ListOauthAppsInfoOutput = z.object({
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
})

export const listOauthAppsInfo = pikkuSessionlessFunc({
  description: "Get public information about an OAuth 2.0 client application registered with Mattermost. The application's client secret will be blanked out.\n##### Permissions\nMust be authenticated.",
  input: ListOauthAppsInfoInput,
  output: ListOauthAppsInfoOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/oauth/apps/{app_id}/info", data) as any
  },
})

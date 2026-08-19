// OAuth — Endpoints for configuring and interacting with Mattermost as an OAuth 2.0 service provider.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateOauthAppsInput = z.object({
  name: z.string().describe("The name of the client application"),
  description: z.string().describe("A short description of the application"),
  icon_url: z.string().optional().describe("A URL to an icon to display with the application"),
  callback_urls: z.array(z.string()).describe("A list of callback URLs for the appliation"),
  homepage: z.string().describe("A link to the website of the application"),
  is_trusted: z.boolean().optional().describe("Set this to `true` to skip asking users for permission"),
})

export const CreateOauthAppsOutput = z.object({
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

export const createOauthApps = pikkuSessionlessFunc({
  description: "Register an OAuth 2.0 client application with Mattermost as the service provider.\n##### Permissions\nMust have `manage_oauth` permission.",
  input: CreateOauthAppsInput,
  output: CreateOauthAppsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/oauth/apps", data) as any
  },
})

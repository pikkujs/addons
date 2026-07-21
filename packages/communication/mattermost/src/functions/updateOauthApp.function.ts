// OAuth — Endpoints for configuring and interacting with Mattermost as an OAuth 2.0 service provider.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateOauthAppInput = z.object({
  app_id: z.string().describe("Application client id"),
  id: z.string().describe("The id of the client application"),
  name: z.string().describe("The name of the client application"),
  description: z.string().describe("A short description of the application"),
  icon_url: z.string().optional().describe("A URL to an icon to display with the application"),
  callback_urls: z.array(z.string()).describe("A list of callback URLs for the appliation"),
  homepage: z.string().describe("A link to the website of the application"),
  is_trusted: z.boolean().optional().describe("Set this to `true` to skip asking users for permission. It will be set to false if value is not provided."),
})

export const UpdateOauthAppOutput = z.object({
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

export const updateOauthApp = pikkuSessionlessFunc({
  description: "Update an OAuth 2.0 client application based on OAuth struct.\n##### Permissions\nIf app creator, must have `mange_oauth` permission otherwise `manage_system_wide_oauth` permission is required.",
  input: UpdateOauthAppInput,
  output: UpdateOauthAppOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/oauth/apps/{app_id}", data) as any
  },
})

// OAuth — Endpoints for configuring and interacting with Mattermost as an OAuth 2.0 service provider.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteOauthAppInput = z.object({
  app_id: z.string().describe("Application client id"),
})

export const DeleteOauthAppOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteOauthApp = pikkuSessionlessFunc({
  description: "Delete and unregister an OAuth 2.0 client application \n##### Permissions\nIf app creator, must have `mange_oauth` permission otherwise `manage_system_wide_oauth` permission is required.",
  input: DeleteOauthAppInput,
  output: DeleteOauthAppOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/oauth/apps/{app_id}", data) as any
  },
})

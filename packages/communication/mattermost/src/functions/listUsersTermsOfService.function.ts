// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const ListUsersTermsOfServiceInput = z.object({
  user_id: z.string().describe("User GUID"),
})

export const ListUsersTermsOfServiceOutput = z.object({
  user_id: z.string().optional().describe("The unique identifier of the user who performed this terms of service action."),
  terms_of_service_id: z.string().optional().describe("The unique identifier of the terms of service the action was performed on."),
  create_at: z.number().int().optional().describe("The time in milliseconds that this action was performed."),
})

export const listUsersTermsOfService = pikkuSessionlessFunc({
  description: "Will be deprecated in v6.0\nFetches user's latest terms of service action if the latest action was for acceptance.\n\n__Minimum server version__: 5.6\n##### Permissions\nMust be logged in as the user being acted on.",
  input: ListUsersTermsOfServiceInput,
  output: ListUsersTermsOfServiceOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/terms_of_service", data) as any
  },
})

// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateUsersTermsOfServiceInput = z.object({
  user_id: z.string().describe("User GUID"),
  serviceTermsId: z.string().describe("terms of service ID on which the user is acting on"),
  accepted: z.string().describe("true or false, indicates whether the user accepted or rejected the terms of service."),
})

export const CreateUsersTermsOfServiceOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createUsersTermsOfService = pikkuSessionlessFunc({
  description: "Records user action when they accept or decline custom terms of service. Records the action in audit table.\nUpdates user's last accepted terms of service ID if they accepted it.\n\n__Minimum server version__: 5.4\n##### Permissions\nMust be logged in as the user being acted on.",
  input: CreateUsersTermsOfServiceInput,
  output: CreateUsersTermsOfServiceOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/{user_id}/terms_of_service", data) as any
  },
})

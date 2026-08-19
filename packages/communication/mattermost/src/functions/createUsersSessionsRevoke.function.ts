// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateUsersSessionsRevokeInput = z.object({
  user_id: z.string().describe("User GUID"),
  session_id: z.string().describe("The session GUID to revoke."),
})

export const CreateUsersSessionsRevokeOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createUsersSessionsRevoke = pikkuSessionlessFunc({
  description: "Revokes a user session from the provided user id and session id strings.\n##### Permissions\nMust be logged in as the user being updated or have the `edit_other_users` permission.",
  input: CreateUsersSessionsRevokeInput,
  output: CreateUsersSessionsRevokeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/users/{user_id}/sessions/revoke", data) as any
  },
})

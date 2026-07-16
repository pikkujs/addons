// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteUserInput = z.object({
  user_id: z.string().describe("User GUID"),
})

export const DeleteUserOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteUser = pikkuSessionlessFunc({
  description: "Deactivates the user and revokes all its sessions by archiving its user object.\n##### Permissions\nMust be logged in as the user being deactivated or have the `edit_other_users` permission.",
  input: DeleteUserInput,
  output: DeleteUserOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/users/{user_id}", data) as any
  },
})

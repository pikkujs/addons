// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const UpdateUsersActiveInput = z.object({
  user_id: z.string().describe("User GUID"),
  active: z.boolean(),
})

export const UpdateUsersActiveOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateUsersActive = pikkuSessionlessFunc({
  description: "Update user active or inactive status.\n\n__Since server version 4.6, users using a SSO provider to login can be activated or deactivated with this endpoint. However, if their activation status in Mattermost does not reflect their status in the SSO provider, the next synchronization or login by that user will reset the activation status to that of their account in the SSO provider. Server versions 4.5 and before do not allow activation or deactivation of SSO users from this endpoint.__\n##### Permissions\nUser can deactivate themselves.\nUser with `manage_system` permission can activate or deactivate a user.",
  input: UpdateUsersActiveInput,
  output: UpdateUsersActiveOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/users/{user_id}/active", data) as any
  },
})

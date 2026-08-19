// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListUsersAuditsInput = z.object({
  user_id: z.string().describe("User GUID"),
})

export const ListUsersAuditsOutput = z.array(z.object({
  id: z.string().optional(),
  create_at: z.number().int().optional().describe("The time in milliseconds a audit was created"),
  user_id: z.string().optional(),
  action: z.string().optional(),
  extra_info: z.string().optional(),
  ip_address: z.string().optional(),
  session_id: z.string().optional(),
}))

export const listUsersAudits = pikkuSessionlessFunc({
  description: "Get a list of audit by providing the user GUID.\n##### Permissions\nMust be logged in as the user or have the `edit_other_users` permission.",
  input: ListUsersAuditsInput,
  output: ListUsersAuditsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/audits", data) as any
  },
})

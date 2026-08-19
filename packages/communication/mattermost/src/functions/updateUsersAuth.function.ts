// users — Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string `me` can be used in place of the user id to indicate the action is to be taken for the logged in user.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const UpdateUsersAuthInput = z.object({
  user_id: z.string().describe("User GUID"),
  auth_data: z.string().optional().describe("Service-specific authentication data"),
  auth_service: z.string().optional().describe("The authentication service such as \"email\", \"gitlab\", or \"ldap\""),
  password: z.string().optional().describe("The password used for email authentication"),
})

export const UpdateUsersAuthOutput = z.object({
  auth_data: z.string().optional().describe("Service-specific authentication data"),
  auth_service: z.string().optional().describe("The authentication service such as \"email\", \"gitlab\", or \"ldap\""),
  password: z.string().optional().describe("The password used for email authentication"),
})

export const updateUsersAuth = pikkuSessionlessFunc({
  description: "Updates a user's authentication method. This can be used to change them to/from LDAP authentication for example.\n\n__Minimum server version__: 4.6\n##### Permissions\nMust have the `edit_other_users` permission.",
  input: UpdateUsersAuthInput,
  output: UpdateUsersAuthOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/users/{user_id}/auth", data) as any
  },
})

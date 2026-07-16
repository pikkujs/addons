// Users — This resource represent users. Use it to: * get, get a list of, create, and delete users. * get, set, and reset a user's default issue table columns. * get a list of the groups the user belongs to. * get a list of user account IDs for a list of usernames or user keys.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetUserEmailInput = z.object({
  accountId: z.string().max(128).describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, `5b10ac8d82e05b22cc7d4ef5`."),
})

export const GetUserEmailOutput = z.object({
  accountId: z.string().optional().describe("The accountId of the user"),
  email: z.string().optional().describe("The email of the user"),
})

export const getUserEmail = pikkuSessionlessFunc({
  description: "Returns a user's email address. This API is only available to apps approved by Atlassian, according to these [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).",
  input: GetUserEmailInput,
  output: GetUserEmailOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/user/email", data) as any
  },
})

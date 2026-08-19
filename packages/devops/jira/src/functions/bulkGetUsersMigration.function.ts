// Users — This resource represent users. Use it to: * get, get a list of, create, and delete users. * get, set, and reset a user's default issue table columns. * get a list of the groups the user belongs to. * get a list of user account IDs for a list of usernames or user keys.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const BulkGetUsersMigrationInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(10).describe("The maximum number of items to return per page."),
  username: z.array(z.string()).optional().describe("Username of a user. To specify multiple users, pass multiple copies of this parameter. For example, `username=fred&username=barney`. Required if `key` isn't provided. Cannot be provided if `key` is present."),
  key: z.array(z.string()).optional().describe("Key of a user. To specify multiple users, pass multiple copies of this parameter. For example, `key=fred&key=barney`. Required if `username` isn't provided. Cannot be provided if `username` is present."),
})

export const BulkGetUsersMigrationOutput = z.array(z.object({
  accountId: z.string().optional(),
  key: z.string().optional(),
  username: z.string().optional(),
}))

export const bulkGetUsersMigration = pikkuSessionlessFunc({
  description: "Returns the account IDs for the users specified in the `key` or `username` parameters. Note that multiple `key` or `username` parameters can be specified.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: BulkGetUsersMigrationInput,
  output: BulkGetUsersMigrationOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/user/bulk/migration", data) as any
  },
})

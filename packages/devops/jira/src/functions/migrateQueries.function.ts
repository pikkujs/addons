// JQL — This resource represents JQL search auto-complete details. Use it to obtain JQL search auto-complete data and suggestions for use in programmatic construction of queries or custom query builders. It also provides operations to: * convert one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs. * convert readable details in one or more JQL queries to IDs where a user doesn't have permission to view the entity whose details are readable.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const MigrateQueriesInput = z.object({
  queryStrings: z.array(z.string()).optional().describe("A list of queries with user identifiers. Maximum of 100 queries."),
})

export const MigrateQueriesOutput = z.object({
  queriesWithUnknownUsers: z.array(z.object({
    convertedQuery: z.string().optional().describe("The converted query, with accountIDs instead of user identifiers, or 'unknown' for users that could not be found"),
    originalQuery: z.string().optional().describe("The original query, for reference"),
  })).optional().describe("List of queries containing user information that could not be mapped to an existing user"),
  queryStrings: z.array(z.string()).optional().describe("The list of converted query strings with account IDs in place of user identifiers."),
}).describe("The converted JQL queries.")

export const migrateQueries = pikkuSessionlessFunc({
  description: "Converts one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs.\n\nYou may wish to use this operation if your system stores JQL queries and you want to make them GDPR-compliant. For more information about GDPR-related changes, see the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/).\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: MigrateQueriesInput,
  output: MigrateQueriesOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/jql/pdcleaner", data) as any
  },
})

// JQL — This resource represents JQL search auto-complete details. Use it to obtain JQL search auto-complete data and suggestions for use in programmatic construction of queries or custom query builders. It also provides operations to: * convert one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs. * convert readable details in one or more JQL queries to IDs where a user doesn't have permission to view the entity whose details are readable.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const SanitiseJqlQueriesInput = z.object({
  queries: z.array(z.object({
  accountId: z.string().max(128).nullable().optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
  query: z.string().describe("The query to sanitize."),
})).describe("The list of JQL queries to sanitize. Must contain unique values. Maximum of 20 queries."),
})

export const SanitiseJqlQueriesOutput = z.object({
  queries: z.array(z.object({
    accountId: z.string().max(128).nullable().optional().describe("The account ID of the user for whom sanitization was performed."),
    errors: z.object({
      errorMessages: z.array(z.string()).optional().describe("The list of error messages produced by this operation. For example, \"input parameter 'key' must be provided\""),
      errors: z.record(z.string(), z.string()).optional().describe("The list of errors by parameter returned by the operation. For example,\"projectKey\": \"Project keys must start with an uppercase letter, followed by one or more uppercase alphanumeric characters.\""),
      status: z.number().int().optional(),
    }).optional().describe("The list of errors."),
    initialQuery: z.string().optional().describe("The initial query."),
    sanitizedQuery: z.string().nullable().optional().describe("The sanitized query, if there were no errors."),
  })).optional().describe("The list of sanitized JQL queries."),
}).describe("The sanitized JQL queries for the given account IDs.")

export const sanitiseJqlQueries = pikkuSessionlessFunc({
  description: "Sanitizes one or more JQL queries by converting readable details into IDs where a user doesn't have permission to view the entity.\n\nFor example, if the query contains the clause *project = 'Secret project'*, and a user does not have browse permission for the project \"Secret project\", the sanitized query replaces the clause with *project = 12345\"* (where 12345 is the ID of the project). If a user has the required permission, the clause is not sanitized. If the account ID is null, sanitizing is performed for an anonymous user.\n\nNote that sanitization doesn't make the queries GDPR-compliant, because it doesn't remove user identifiers (username or user key). If you need to make queries GDPR-compliant, use [Convert user identifiers to account IDs in JQL queries](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql/#api-rest-api-3-jql-sanitize-post).\n\nBefore sanitization each JQL query is parsed. The queries are returned in the same order that they were passed.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: SanitiseJqlQueriesInput,
  output: SanitiseJqlQueriesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/jql/sanitize", data) as any
  },
})

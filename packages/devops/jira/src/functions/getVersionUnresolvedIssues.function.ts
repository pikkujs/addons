// Project versions — This resource represents project versions. Use it to get, get lists of, create, update, move, merge, and delete project versions. This resource also provides counts of issues by version.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetVersionUnresolvedIssuesInput = z.object({
  id: z.string().describe("The ID of the version."),
})

export const GetVersionUnresolvedIssuesOutput = z.object({
  issuesCount: z.number().int().optional().describe("Count of issues."),
  issuesUnresolvedCount: z.number().int().optional().describe("Count of unresolved issues."),
  self: z.string().url().optional().describe("The URL of these count details."),
}).describe("Count of a version's unresolved issues.")

export const getVersionUnresolvedIssues = pikkuSessionlessFunc({
  description: "Returns counts of the issues and unresolved issues for the project version.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse projects* project permission for the project that contains the version.",
  input: GetVersionUnresolvedIssuesInput,
  output: GetVersionUnresolvedIssuesOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/version/{id}/unresolvedIssueCount", data) as any
  },
})

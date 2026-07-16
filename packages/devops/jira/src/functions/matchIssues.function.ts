// Issue search — This resource represents various ways to search for issues. Use it to search for issues with a JQL query and find issues to populate an issue picker.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const MatchIssuesInput = z.object({
  issueIds: z.array(z.number().int()).describe("A list of issue IDs."),
  jqls: z.array(z.string()).describe("A list of JQL queries."),
})

export const MatchIssuesOutput = z.object({
  matches: z.array(z.object({
    errors: z.array(z.string()).describe("A list of errors."),
    matchedIssues: z.array(z.number().int()).describe("A list of issue IDs."),
  })),
}).describe("A list of matched issues or errors for each JQL query, in the order the JQL queries were passed.")

export const matchIssues = pikkuSessionlessFunc({
  description: "Checks whether one or more issues would be returned by one or more JQL queries.\n\n**[Permissions](#permissions) required:** None, however, issues are only matched against JQL queries where the user has:\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: MatchIssuesInput,
  output: MatchIssuesOutput,
  errors: [BadRequestError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/jql/match", data) as any
  },
})

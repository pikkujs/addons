// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const IssuesCheckUserCanBeAssignedToIssueInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  issue_number: z.number().int().describe("The number that identifies the issue."),
  assignee: z.string(),
})

export const issuesCheckUserCanBeAssignedToIssue = pikkuSessionlessFunc({
  description: "Checks if a user has permission to be assigned to a specific issue.\n\nIf the `assignee` can be assigned to this issue, a `204` status code with no content is returned.\n\nOtherwise a `404` status code is returned.",
  input: IssuesCheckUserCanBeAssignedToIssueInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}", data)
  },
})

// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const IssuesCheckUserCanBeAssignedInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  assignee: z.string(),
})

export const issuesCheckUserCanBeAssigned = pikkuSessionlessFunc({
  description: "Checks if a user has permission to be assigned to an issue in this repository.\n\nIf the `assignee` can be assigned to issues in the repository, a `204` header with no content is returned.\n\nOtherwise a `404` status code is returned.",
  input: IssuesCheckUserCanBeAssignedInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/assignees/{assignee}", data)
  },
})

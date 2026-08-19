// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IssuesRemoveAssigneesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  issue_number: z.number().int().describe("The number that identifies the issue."),
  assignees: z.array(z.string()).optional().describe("Usernames of assignees to remove from an issue. _NOTE: Only users with push access can remove assignees from an issue. Assignees are silently ignored otherwise._"),
})

export const IssuesRemoveAssigneesOutput = z.any()

export const issuesRemoveAssignees = pikkuSessionlessFunc({
  description: "Removes one or more assignees from an issue.",
  input: IssuesRemoveAssigneesInput,
  output: IssuesRemoveAssigneesOutput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/issues/{issue_number}/assignees", data) as any
  },
})

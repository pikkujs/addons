// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IssuesAddAssigneesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  issue_number: z.number().int().describe("The number that identifies the issue."),
  assignees: z.array(z.string()).optional().describe("Usernames of people to assign this issue to. _NOTE: Only users with push access can add assignees to an issue. Assignees are silently ignored otherwise._"),
})

export const IssuesAddAssigneesOutput = z.any()

export const issuesAddAssignees = pikkuSessionlessFunc({
  description: "Adds up to 10 assignees to an issue. Users already assigned to an issue are not replaced.",
  input: IssuesAddAssigneesInput,
  output: IssuesAddAssigneesOutput,
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/issues/{issue_number}/assignees", data) as any
  },
})

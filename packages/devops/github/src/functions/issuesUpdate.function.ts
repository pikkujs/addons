// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const IssuesUpdateInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  issue_number: z.number().int().describe("The number that identifies the issue."),
  assignee: z.string().nullable().optional().describe("Username to assign to this issue. **This field is deprecated.**"),
  assignees: z.array(z.string()).optional().describe("Usernames to assign to this issue. Pass one or more user logins to _replace_ the set of assignees on this issue. Send an empty array (`[]`) to clear all assignees from the issue. Only users with push access can set assignees for new issues. Without push access to the repository, assignee changes are silently dropped."),
  body: z.string().nullable().optional().describe("The contents of the issue."),
  labels: z.array(z.union([z.string(), z.object({
  color: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.number().int().optional(),
  name: z.string().optional(),
})])).optional().describe("Labels to associate with this issue. Pass one or more labels to _replace_ the set of labels on this issue. Send an empty array (`[]`) to clear all labels from the issue. Only users with push access can set labels for issues. Without push access to the repository, label changes are silently dropped."),
  milestone: z.union([z.string(), z.number().int()]).nullable().optional(),
  state: z.enum(["open", "closed"]).optional().describe("The open or closed state of the issue."),
  state_reason: z.enum(["completed", "not_planned", "reopened"]).nullable().optional().describe("The reason for the state change. Ignored unless `state` is changed."),
  title: z.union([z.string(), z.number().int()]).nullable().optional().describe("The title of the issue."),
})

export const IssuesUpdateOutput = z.any()

export const issuesUpdate = pikkuSessionlessFunc({
  description: "Issue owners and users with push access can edit an issue.",
  input: IssuesUpdateInput,
  output: IssuesUpdateOutput,
  errors: [ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/issues/{issue_number}", data) as any
  },
})

// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const IssuesCreateInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  assignee: z.string().nullable().optional().describe("Login for the user that this issue should be assigned to. _NOTE: Only users with push access can set the assignee for new issues. The assignee is silently dropped otherwise. **This field is deprecated.**_"),
  assignees: z.array(z.string()).optional().describe("Logins for Users to assign to this issue. _NOTE: Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise._"),
  body: z.string().optional().describe("The contents of the issue."),
  labels: z.array(z.union([z.string(), z.object({
  color: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.number().int().optional(),
  name: z.string().optional(),
})])).optional().describe("Labels to associate with this issue. _NOTE: Only users with push access can set labels for new issues. Labels are silently dropped otherwise._"),
  milestone: z.union([z.string(), z.number().int()]).nullable().optional(),
  title: z.union([z.string(), z.number().int()]).describe("The title of the issue."),
})

export const IssuesCreateOutput = z.any()

export const issuesCreate = pikkuSessionlessFunc({
  description: "Any user with pull access to a repository can create an issue. If [issues are disabled in the repository](https://docs.github.com/articles/disabling-issues/), the API returns a `410 Gone` status.\n\nThis endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in secondary rate limiting. See \"[Secondary rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#secondary-rate-limits)\" and \"[Dealing with secondary rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-secondary-rate-limits)\" for details.",
  input: IssuesCreateInput,
  output: IssuesCreateOutput,
  errors: [ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/issues", data) as any
  },
})

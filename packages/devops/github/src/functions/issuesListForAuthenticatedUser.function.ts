// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const IssuesListForAuthenticatedUserInput = z.object({
  filter: z.enum(["assigned", "created", "mentioned", "subscribed", "repos", "all"]).optional().default("assigned").describe("Indicates which sorts of issues to return. `assigned` means issues assigned to you. `created` means issues created by you. `mentioned` means issues mentioning you. `subscribed` means issues you're subscribed to updates for. `all` or `repos` means all issues you can see, regardless of participation or creation."),
  state: z.enum(["open", "closed", "all"]).optional().default("open").describe("Indicates the state of the issues to return."),
  labels: z.string().optional().describe("A list of comma separated label names. Example: `bug,ui,@high`"),
  sort: z.enum(["created", "updated", "comments"]).optional().default("created").describe("What to sort results by."),
  direction: z.enum(["asc", "desc"]).optional().default("desc").describe("The direction to sort the results by."),
  since: z.string().datetime().optional().describe("Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const IssuesListForAuthenticatedUserOutput = z.any()

export const issuesListForAuthenticatedUser = pikkuSessionlessFunc({
  description: "List issues across owned and member repositories assigned to the authenticated user.\n\n**Note**: GitHub's REST API considers every pull request an issue, but not every issue is a pull request. For this\nreason, \"Issues\" endpoints may return both issues and pull requests in the response. You can identify pull requests by\nthe `pull_request` key. Be aware that the `id` of a pull request returned from \"Issues\" endpoints will be an _issue id_. To find out the pull\nrequest id, use the \"[List pull requests](https://docs.github.com/rest/reference/pulls#list-pull-requests)\" endpoint.",
  input: IssuesListForAuthenticatedUserInput,
  output: IssuesListForAuthenticatedUserOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/issues", data) as any
  },
})

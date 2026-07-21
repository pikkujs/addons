// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const IssuesListForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  milestone: z.string().optional().describe("If an `integer` is passed, it should refer to a milestone by its `number` field. If the string `*` is passed, issues with any milestone are accepted. If the string `none` is passed, issues without milestones are returned."),
  state: z.enum(["open", "closed", "all"]).optional().default("open").describe("Indicates the state of the issues to return."),
  assignee: z.string().optional().describe("Can be the name of a user. Pass in `none` for issues with no assigned user, and `*` for issues assigned to any user."),
  creator: z.string().optional().describe("The user that created the issue."),
  mentioned: z.string().optional().describe("A user that's mentioned in the issue."),
  labels: z.string().optional().describe("A list of comma separated label names. Example: `bug,ui,@high`"),
  sort: z.enum(["created", "updated", "comments"]).optional().default("created").describe("What to sort results by."),
  direction: z.enum(["asc", "desc"]).optional().default("desc").describe("The direction to sort the results by."),
  since: z.string().datetime().optional().describe("Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const IssuesListForRepoOutput = z.any()

export const issuesListForRepo = pikkuSessionlessFunc({
  description: "List issues in a repository. Only open issues will be listed.\n\n**Note**: GitHub's REST API considers every pull request an issue, but not every issue is a pull request. For this\nreason, \"Issues\" endpoints may return both issues and pull requests in the response. You can identify pull requests by\nthe `pull_request` key. Be aware that the `id` of a pull request returned from \"Issues\" endpoints will be an _issue id_. To find out the pull\nrequest id, use the \"[List pull requests](https://docs.github.com/rest/reference/pulls#list-pull-requests)\" endpoint.",
  input: IssuesListForRepoInput,
  output: IssuesListForRepoOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/issues", data) as any
  },
})

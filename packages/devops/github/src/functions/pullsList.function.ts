// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const PullsListInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  state: z.enum(["open", "closed", "all"]).optional().default("open").describe("Either `open`, `closed`, or `all` to filter by state."),
  head: z.string().optional().describe("Filter pulls by head user or head organization and branch name in the format of `user:ref-name` or `organization:ref-name`. For example: `github:new-script-format` or `octocat:test-branch`."),
  base: z.string().optional().describe("Filter pulls by base branch name. Example: `gh-pages`."),
  sort: z.enum(["created", "updated", "popularity", "long-running"]).optional().default("created").describe("What to sort results by. `popularity` will sort by the number of comments. `long-running` will sort by date created and will limit the results to pull requests that have been open for more than a month and have had activity within the past month."),
  direction: z.enum(["asc", "desc"]).optional().describe("The direction of the sort. Default: `desc` when sort is `created` or sort is not specified, otherwise `asc`."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const PullsListOutput = z.any()

export const pullsList = pikkuSessionlessFunc({
  description: "Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.",
  input: PullsListInput,
  output: PullsListOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/pulls", data) as any
  },
})

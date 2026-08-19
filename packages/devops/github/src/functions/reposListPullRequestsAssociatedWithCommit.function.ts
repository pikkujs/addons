// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposListPullRequestsAssociatedWithCommitInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  commit_sha: z.string().describe("The SHA of the commit."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ReposListPullRequestsAssociatedWithCommitOutput = z.any()

export const reposListPullRequestsAssociatedWithCommit = pikkuSessionlessFunc({
  description: "Lists the merged pull request that introduced the commit to the repository. If the commit is not present in the default branch, will only return open pull requests associated with the commit.",
  input: ReposListPullRequestsAssociatedWithCommitInput,
  output: ReposListPullRequestsAssociatedWithCommitOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/commits/{commit_sha}/pulls", data) as any
  },
})

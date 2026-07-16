// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const ReposListBranchesForHeadCommitInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  commit_sha: z.string().describe("The SHA of the commit."),
})

export const ReposListBranchesForHeadCommitOutput = z.array(z.object({
  commit: z.object({
    sha: z.string(),
    url: z.string(),
  }),
  name: z.string(),
  protected: z.boolean(),
}))

export const reposListBranchesForHeadCommit = pikkuSessionlessFunc({
  description: "Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.\n\nReturns all branches where the given commit SHA is the HEAD, or latest commit for the branch.",
  input: ReposListBranchesForHeadCommitInput,
  output: ReposListBranchesForHeadCommitOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", data) as any
  },
})

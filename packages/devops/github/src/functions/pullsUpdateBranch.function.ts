// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const PullsUpdateBranchInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  expected_head_sha: z.string().optional().describe("The expected SHA of the pull request's HEAD ref. This is the most recent commit on the pull request's branch. If the expected SHA does not match the pull request's HEAD, you will receive a `422 Unprocessable Entity` status. You can use the \"[List commits](https://docs.github.com/rest/reference/repos#list-commits)\" endpoint to find the most recent commit SHA. Default: SHA of the pull request's current HEAD ref."),
})

export const PullsUpdateBranchOutput = z.object({
  message: z.string().optional(),
  url: z.string().optional(),
})

export const pullsUpdateBranch = pikkuSessionlessFunc({
  description: "Updates the pull request branch with the latest upstream changes by merging HEAD from the base branch into the pull request branch.",
  input: PullsUpdateBranchInput,
  output: PullsUpdateBranchOutput,
  errors: [ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/pulls/{pull_number}/update-branch", data) as any
  },
})

// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const PullsRemoveRequestedReviewersInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  reviewers: z.array(z.string()).describe("An array of user `login`s that will be removed."),
  team_reviewers: z.array(z.string()).optional().describe("An array of team `slug`s that will be removed."),
})

export const PullsRemoveRequestedReviewersOutput = z.any()

export const pullsRemoveRequestedReviewers = pikkuSessionlessFunc({
  input: PullsRemoveRequestedReviewersInput,
  output: PullsRemoveRequestedReviewersOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers", data) as any
  },
})

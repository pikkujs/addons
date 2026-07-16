// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const PullsCheckIfMergedInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
})

export const pullsCheckIfMerged = pikkuSessionlessFunc({
  input: PullsCheckIfMergedInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/pulls/{pull_number}/merge", data)
  },
})

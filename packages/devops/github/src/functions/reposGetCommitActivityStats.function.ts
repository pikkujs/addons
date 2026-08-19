// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposGetCommitActivityStatsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposGetCommitActivityStatsOutput = z.array(z.object({
  days: z.array(z.number().int()),
  total: z.number().int(),
  week: z.number().int(),
}))

export const reposGetCommitActivityStats = pikkuSessionlessFunc({
  description: "Returns the last year of commit activity grouped by week. The `days` array is a group of commits per day, starting on `Sunday`.",
  input: ReposGetCommitActivityStatsInput,
  output: ReposGetCommitActivityStatsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/stats/commit_activity", data) as any
  },
})

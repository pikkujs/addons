// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposGetCodeFrequencyStatsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposGetCodeFrequencyStatsOutput = z.array(z.array(z.number().int()))

export const reposGetCodeFrequencyStats = pikkuSessionlessFunc({
  description: "Returns a weekly aggregate of the number of additions and deletions pushed to a repository.",
  input: ReposGetCodeFrequencyStatsInput,
  output: ReposGetCodeFrequencyStatsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/stats/code_frequency", data) as any
  },
})
